import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Play from '../components/Play';
import Waiting from '../components/Waiting';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  return ( isStarted ?
    <Play /> : <Waiting startOnClick={() => setIsStarted(true)} />
  );
}
