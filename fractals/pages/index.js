import Head from 'next/head';
import Controller from '../components/controller';
import styles from '../styles/index.module.css';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Fractals.io - Mandelbrot</title>
            </Head>
            <div id={styles.content}>
                <div id={styles.controller}>
                    <Controller />
                </div>
                <div id={styles.instructions}>
                    Instructions
                </div>
            </div>
        </div>
    )
}
