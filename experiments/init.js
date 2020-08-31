//Script to call the mandelbrot function on page load

import * as wasm from './pkg';

const X_MIN = -2.0;
const X_MAX = 1.0;
const Y_MIN = -1.5;
const Y_MAX = 1.5;

(function loadMandelbrot() {
    console.time('Mandelbrot loaded in');
    const fractalCanvas = document.getElementById('fractalCanvas');
    const width = fractalCanvas.width;
    const height = fractalCanvas.height;

    //Create an image from our mandelbrot results
    //const pixels = wasm.mandelbrot(width, height, -1.0, -0.5, 0.0, 0.5, 60, 0.0, 0.8, 1.0);
    const pixels = wasm.mandelbrot(width, height, X_MIN, X_MAX, Y_MIN, Y_MAX, 60, 1.0, 0.0, 0.2);
    const fractalArray = new Uint8ClampedArray(pixels);
    const fractalImage = new ImageData(fractalArray, width, height);

    //Store the image in our canvas
    const ctx = fractalCanvas.getContext('2d');
    ctx.putImageData(fractalImage, 0, 0);
    console.timeEnd('Mandelbrot loaded in');
})();
