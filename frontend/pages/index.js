import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fractals.io - Mandelbrot</title>
        <script
            type='text/javascript'
            src='./../scripts/mandelbrot.js'>
        </script>
      </Head>

      <main>
        <h1>
          The Mandelbrot Set
        </h1>
        <canvas id='fractalCanvas' width={400} height={400}></canvas>
      </main>
    </div>
  )
}
