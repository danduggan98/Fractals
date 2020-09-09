import Head from 'next/head';
import Mandelbrot from '../components/mandelbrot';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Fractals.io - Mandelbrot</title>
            </Head>
            <div id='title'>The Mandelbrot Set</div>
            <div id='mandelbrotContainer'>
                <Mandelbrot />
                <div id='controls'>
                    controls go here
                </div>
            </div>
        </div>
    )
}
