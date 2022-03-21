import Head from 'next/head';
import { useState } from 'react';
import Play from '../components/Play';
import Test from '../components/Test';
import Waiting from '../components/Waiting';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  return ( isStarted ?
    <Play /> : <Waiting startOnClick={() => setIsStarted(true)} />
  );
  // return (
  //   <Test />
  // );
}
