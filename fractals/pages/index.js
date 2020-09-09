import Head from 'next/head';
import Controller from '../components/controller';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Fractals.io - Mandelbrot</title>
            </Head>
            <div id='title'>The Mandelbrot Set</div>
            <div id='controller'>
                <Controller />
            </div>
        </div>
    )
}
