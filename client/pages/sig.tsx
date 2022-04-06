import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {generateProof, verifyProof} from '../lib/util'

const Sig: NextPage = () => {
  const [status, setStatus] = useState(false);
  const [proof, setProof] = useState<string>("");
  const [publicSignals, setPublicSignals] = useState<Array<string>>([]);
  
  async function buttonGenerateProof() {
    console.time('Generation');
    const res = await generateProof('group_message_64_4_7');
    console.timeEnd('Generation');
    setProof(res.proof);
    setPublicSignals(res.publicSignals);
    setStatus(false);
  }

  async function buttonVerifyProof() {
    console.time('Verification');
    const res = await verifyProof(proof, publicSignals, 'group_message_64_4_7');
    console.timeEnd('Verification');
    console.log(res);
    if (res.verification) {
        setStatus(true);
    } else {
        setStatus(false);
    }
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>dizkus sig</title>
        <meta name="description" content="Anonymously post as a member of an on-chain group" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/">
          <a>
            <h1 className={styles.title}>
              dizkus sig
            </h1>
          </a>
        </Link>

        <p className={styles.description}>
          Circuit with EDCSAVerify
        </p>

        <div className={styles.grid}>
          <div className={styles.card} onClick={buttonGenerateProof}>
            <h2>Generate proof &rarr;</h2>
          </div>

          <div className={styles.card} onClick={buttonVerifyProof}>
            <h2>Verify proof &rarr;</h2>
          </div>
        </div>

        {status ? (
          <div className={styles.card}>
            <h2>✅ Verified</h2>
            <div>
              <textarea rows={10} className={styles.textarea} value={JSON.stringify(proof, null, 1)} />
            </div>
          </div>
          ) : (
          <div className={styles.card}>
            <h2>❌ Unverified</h2>
          </div>
          )
        }
      </main>

      <footer className={styles.footer}>
      <a href='https://github.com/vb7401'>
          Built by Vivek Bhupatiraju
      </a>
      </footer>
    </div>
  )
}

export default Sig;
