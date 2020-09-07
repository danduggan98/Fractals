import { Component } from 'react';

const X_MIN = -2.0;
const X_MAX = 0.5;
const Y_MIN = -1.2;
const Y_MAX = 1.2;
const max_iterations = 128;

//Store our WASM module and canvas information in the global scope
let wasm;
let canvasContext, canvasWidth, canvasHeight;
let cur_x_0, cur_x_1, cur_y_0, cur_y_1;

const setupPage = async() => {
    console.time('WASM module loaded in');
    wasm = await import('../fractal_utils/pkg');

    const fractalCanvas = document.getElementById('mandelbrotCanvas');
    canvasWidth   = fractalCanvas.width;
    canvasHeight  = fractalCanvas.height;
    canvasContext = fractalCanvas.getContext('2d');
    console.timeEnd('WASM module loaded in');
}

//Place our Mandelbrot data into the canvas
const renderMandelbrot = async (x_0, x_1, y_0, y_1, iterations) => {
    console.time('Mandelbrot loaded in');
    const data = wasm.mandelbrot(canvasWidth, canvasHeight, x_0, x_1, y_0, y_1, iterations);

    const fractalArray = new Uint8ClampedArray(data);
    const fractalImage = new ImageData(fractalArray, canvasWidth, canvasHeight);
    canvasContext.putImageData(fractalImage, 0, 0);
    console.timeEnd('Mandelbrot loaded in');
}

//Zoom in a given percentage from a particular point (x,y)
const zoom = async (x, y, percentage) => {
    const x_radius = ((cur_x_1 - cur_x_0) * (1 - percentage)) / 2;
    const y_radius = ((cur_y_1 - cur_y_0) * (1 - percentage)) / 2;
    console.log(`x_r = ${x_radius}, y_r = ${y_radius}`);

    const new_x_0 = x - x_radius;
    const new_x_1 = x + x_radius;
    const new_y_0 = y - y_radius;
    const new_y_1 = y + y_radius;
    console.log(`NEW: ${new_x_0}, ${new_x_1}, ${new_y_0}, ${new_y_1}`);

    await renderMandelbrot(new_x_0, new_x_1, new_y_0, new_y_1, max_iterations);
}

//NEXT - STORE ALL DATA + ZOOM FUNCTION IN COMPONENT, MANIPULATE STATE TO RENDER AND UPDATE BOUNDS
export default class Mandelbrot extends Component {
    async componentDidMount() {
        await setupPage();

        cur_x_0 = X_MIN;
        cur_x_1 = X_MAX;
        cur_y_0 = Y_MIN;
        cur_y_1 = Y_MAX;
        let xdiff = (cur_x_1 - cur_x_0) / 2;
        let ydiff = (cur_y_1 - cur_y_0) / 2;

        console.log(`OG: ${cur_x_0}, ${cur_x_1}, ${cur_y_0}, ${cur_y_1}`);

        //await renderMandelbrot(cur_x_0, cur_x_1, cur_y_0, cur_y_1, max_iterations); //Render the default Mandelbrot on page load
        await zoom(cur_x_1 - xdiff, cur_y_1 - ydiff, 0.75);
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
