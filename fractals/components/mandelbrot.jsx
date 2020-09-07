import { Component } from 'react';

const X_MIN = -2.0;
const X_MAX = 0.5;
const Y_MIN = -1.2;
const Y_MAX = 1.2;
const max_iterations = 128;

const populateCanvas = async (x_0, x_1, y_0, y_1, iterations) => {
    const wasm = await import('../fractal_utils/pkg');

    //Find the canvas, get its dimensions
    const fractalCanvas = document.getElementById('mandelbrotCanvas');
    const width  = fractalCanvas.width;
    const height = fractalCanvas.height;

    //Run the function and save the result as an image
    const data = wasm.mandelbrot(width, height, x_0, x_1, y_0, y_1, iterations);
    const fractalArray = new Uint8ClampedArray(data);
    const fractalImage = new ImageData(fractalArray, width, height);

    //Store the image in our canvas
    const ctx = fractalCanvas.getContext('2d');
    ctx.putImageData(fractalImage, 0, 0);
}

export default class Mandelbrot extends Component {
    async componentDidMount() {
        console.time('Mandelbrot loaded in');
        await populateCanvas(X_MIN, X_MAX, Y_MIN, Y_MAX, max_iterations);
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
