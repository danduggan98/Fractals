import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fractals.io - Mandelbrot</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The Mandelbrot Set
        </h1>
        <canvas id='fractalCanvas' width={500} height={500}></canvas>
      </main>
    </div>
  )
}
