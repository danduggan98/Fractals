import Head from 'next/head';
import Controller from '../components/controller';
import styles from '../styles/index.module.css';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Fractals.io - Mandelbrot</title>
            </Head>
            <div id={styles.title}>The Mandelbrot Set</div>
            <div id={styles.controller}>
                <Controller />
            </div>
        </div>
    )
}
