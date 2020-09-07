import { Component } from 'react';

const X_MIN = -2.0;
const X_MAX = 0.5;
const Y_MIN = -1.2;
const Y_MAX = 1.2;
const max_iterations = 128;

//Store our WASM module and canvas information in the global scope
let wasm;
let canvasContext, canvasWidth, canvasHeight;

const setupPage = async() => {
    wasm = await import('../fractal_utils/pkg');

    const fractalCanvas = document.getElementById('mandelbrotCanvas');
    canvasWidth   = fractalCanvas.width;
    canvasHeight  = fractalCanvas.height;
    canvasContext = fractalCanvas.getContext('2d');
}

//Place our Mandelbrot data into the canvas
const renderMandelbrot = async (x_0, x_1, y_0, y_1, iterations) => {
    const data = wasm.mandelbrot(canvasWidth, canvasHeight, x_0, x_1, y_0, y_1, iterations);
    const fractalArray = new Uint8ClampedArray(data);
    const fractalImage = new ImageData(fractalArray, canvasWidth, canvasHeight);
    canvasContext.putImageData(fractalImage, 0, 0);
}

export default class Mandelbrot extends Component {
    async componentDidMount() {
        console.time('WASM module loaded in');
        await setupPage();
        console.timeEnd('WASM module loaded in');

        console.time('Mandelbrot loaded in');
        await renderMandelbrot(X_MIN, X_MAX, Y_MIN, Y_MAX, max_iterations); //Render the default Mandelbrot on page load
        console.timeEnd('Mandelbrot loaded in');
    }

    render() {
        return (
            <div>
                <div>mandelbrot!</div>
                <canvas id='mandelbrotCanvas' width={1500} height={1500}></canvas>
            </div>
        )
    }
}
