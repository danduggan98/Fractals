import { Component } from 'react';
import dynamic from 'next/dynamic';

const X_MIN = -2.0;
const X_MAX = 0.5;
const Y_MIN = -1.2;
const Y_MAX = 1.2;
const max_iterations = 128;

const mandelbrotData = async () => {
    const wasmPackage = await import('../fractal_utils/pkg');
    return wasmPackage.mandelbrot(400, 400, X_MIN, X_MAX, Y_MIN, Y_MAX, max_iterations);
};

export default class Mandelbrot extends Component {
    async componentDidMount() {
        console.log(await mandelbrotData());
    }

    render() {
        return (
            <div>
                <div>mandelbrot!</div>
                <canvas id='fractalCanvas' width={400} height={400}></canvas>
            </div>
        )
    }
}
