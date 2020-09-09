import Head from 'next/head';
import Mandelbrot from '../components/mandelbrot';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Fractals.io - Mandelbrot</title>
            </Head>
            <div>Welcome to Fractals.io!</div>
            <Mandelbrot />
        </div>
    )
}
