import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Mandelbrot from '../components/mandelbrot';

export default function Home() {
    return (
        <div>
            <div>Welcome to Fractals.io!</div>
            <Mandelbrot />
        </div>
    )
}
