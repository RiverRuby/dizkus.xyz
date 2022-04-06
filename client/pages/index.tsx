import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>dizkus</title>
        <meta name="description" content="Anonymously post as a member of an on-chain group" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/">
          <a>
            <h1 className={styles.title}>
              dizkus
            </h1>
          </a>
        </Link>

        <p className={styles.description}>
          Anonymously post as a member of a group using{' '}
          <code className={styles.code}>zk-SNARKs</code>
        </p>

        <div className={styles.grid}>
          <Link href="/nosig">
            <a className={styles.card}>
              <h2>Circuit without ECDSAVerify &rarr;</h2>
            </a>
          </Link>

          <Link href="/sig">
            <a className={styles.card}>
              <h2>Circuit with ECDSAVerify &rarr;</h2>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
      <a href='https://github.com/vb7401'>
          Built by Vivek Bhupatiraju
      </a>
      </footer>
    </div>
  )
}

export default Home
