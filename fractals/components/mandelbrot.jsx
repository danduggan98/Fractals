import { Component } from 'react';

const X_MIN = -2.0;
const X_MAX = 0.5;
const Y_MIN = -1.2;
const Y_MAX = 1.2;
const max_iterations = 128;

const mandelbrotData = async (width, height) => {
    const wasmPackage = await import('../fractal_utils/pkg');
    return wasmPackage.mandelbrot(width, height, X_MIN, X_MAX, Y_MIN, Y_MAX, max_iterations);
};

const populateCanvas = async () => {
    //Find the canvas, get its dimensions
    const fractalCanvas = document.getElementById('mandelbrotCanvas');
    const width = fractalCanvas.width;
    const height = fractalCanvas.height;

    //Run the function and save the result as an image
    const data = await mandelbrotData(width, height);
    const fractalArray = new Uint8ClampedArray(data);
    const fractalImage = new ImageData(fractalArray, width, height);

    //Store the image in our canvas
    const ctx = fractalCanvas.getContext('2d');
    ctx.putImageData(fractalImage, 0, 0);
}

export default class Mandelbrot extends Component {
    async componentDidMount() {
        await populateCanvas();
    }

    render() {
        return (
            <div>
                <div>mandelbrot!</div>
                <canvas id='mandelbrotCanvas' width={800} height={800}></canvas>
            </div>
        )
    }
}
