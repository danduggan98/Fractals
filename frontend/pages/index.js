import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fractals.io - Mandelbrot</title>
      </Head>

      <main>
        <h1>
          The Mandelbrot Set
        </h1>
        <canvas id='fractalCanvas' width={500} height={500}></canvas>
      </main>
    </div>
  )
}
