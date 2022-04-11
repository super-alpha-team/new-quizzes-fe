import Head from 'next/head';
import { useEffect, useState } from 'react';
import Play from '../components/Play';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loading from '../components/helpers/Loading';
import { SERVER_URL } from '../utils/config';

const RoleEnum = {
  ADMIN: "admin",
  MEMBER: "member",
};

export default function Home() {
  const router = useRouter();

  // get info
  useEffect(() => {
    async function getInfo() {
      const responseInfo = await axios.get(
        `${SERVER_URL}/lti/sync/info`,
        { headers: { Authorization: `Bearer ${router.query.ltik}` } }
      );
      
      console.log(']> start up page: ', responseInfo.data);
      const data = responseInfo.data.data;
      // check is member or teacher class
      if (data.alpha_roles.indexOf(RoleEnum.ADMIN) != -1 ) {
        return router.push(`/conf?ltik=${router.query.ltik}`);
      }
      
      if (data.alpha_roles.indexOf(RoleEnum.MEMBER) != -1 ) {
        return router.push(`/play?ltik=${router.query.ltik}`);
      }

      return (
        <p>Permission denied</p>
      );

    }
    if (router.query.ltik) {
      getInfo();
    }
  }, [router.query.ltik]);

  return (
    <p>Loading</p>
  );
}
