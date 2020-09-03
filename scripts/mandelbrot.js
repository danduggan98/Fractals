import * as wasm from '../fractal_utils/pkg/fractal_utils';
let pixels = wasm.mandelbrot(400, 400, -2.0, 0.0, 25);

const fractalCanvas = document.getElementById('fractalCanvas');
const ctx = fractalCanvas.getContext('2d');

const imageData = new ImageData(400, 400);
imageData.data.set(pixels);
ctx.putImageData(imageData, 0, 0);
