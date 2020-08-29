import * as wasm from './pkg';
import { memory } from './pkg/experiments_bg';

(function loadMandelbrot() {
    const fractalCanvas = document.getElementById('fractalCanvas');
    const ctx = fractalCanvas.getContext('2d');
    const width = fractalCanvas.width;
    const height = fractalCanvas.height;

    const pixels = wasm.mandelbrot(width, height, -2.0, 0.0, 25);
    console.log('Initial data:', pixels);

    const fractal = new Uint8ClampedArray(
        memory.buffer,
        pixels,
        (4 * width * height)
    )

    const fractalImage = new ImageData(fractal, width, height);
    console.log('Initial image data:', fractalImage.data);
    
    ctx.putImageData(fractalImage, 0, 0);
    console.log('Final image data:', ctx.getImageData(0,0,width,height));
})();
