import { useEffect, useState } from 'react';
import Play from '../components/playing/Play';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loading from '../components/helpers/Loading';
import { SERVER_URL } from '../utils/config';
import syncApi from '../apis/syncApi';

const RoleEnum = {
  ADMIN: "admin",
  MEMBER: "member",
};

export default function Home() {
  const router = useRouter();

  // get info
  useEffect(() => {
    async function getInfo() {
      let ltik = router?.query?.ltik;
      if (!ltik) return;

      let responseInfo = await syncApi.syncInfo(ltik);
      
      // console.log(']> start up page: ', responseInfo.data);
      const data = responseInfo.data.data;
      // check is member or teacher class
      if (data.alpha_roles.indexOf(RoleEnum.ADMIN) != -1 ) {
        return router.push(`/conf?ltik=${ltik}`);
      }
      
      if (data.alpha_roles.indexOf(RoleEnum.MEMBER) != -1 ) {
        return router.push(`/play?ltik=${ltik}`);
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
