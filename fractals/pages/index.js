import Head from 'next/head';
import Mandelbrot from '../components/mandelbrot';

export default function Home() {
    return (
        <div>
            <Head>
                Fractals.io - Mandelbrot
            </Head>
            <div>Welcome to Fractals.io!</div>
            <Mandelbrot />
        </div>
    )
}
