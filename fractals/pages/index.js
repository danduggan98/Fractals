import Head from 'next/head';
import MandelbrotController from '../components/mandelbrotController';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Fractals.io - Mandelbrot</title>
            </Head>
            <div id='title'>The Mandelbrot Set</div>
            <div id='controller'>
                <MandelbrotController />
            </div>
        </div>
    )
}
