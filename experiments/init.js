//DATA IS THERE, BUT ITS NOT VISIBLE???

import * as wasm from './pkg';

(function loadMandelbrot() {
    const fractalCanvas = document.getElementById('fractalCanvas');
    const width = fractalCanvas.width;
    const height = fractalCanvas.height;

    //Create an image from our mandelbrot results
    const pixels = wasm.mandelbrot(width, height, 0.0, 0.0, 100);
    const fractalArray = new Uint8ClampedArray(pixels);
    const fractalImage = new ImageData(fractalArray, width, height);

    //Store the image in our canvas
    const ctx = fractalCanvas.getContext('2d');
    ctx.putImageData(fractalImage, 0, 0);

    console.log('Initial image data:', fractalImage.data);
    console.log('Initial data:', pixels);
    console.log('Final image data:', ctx.getImageData(0,0,width,height));
})();
