import { Component } from 'react';
import Mandelbrot from '../components/mandelbrot';

export default class MandelbrotController extends Component {
    constructor() {
        super();
        this.state = {
            maxIterations: 255,
            canvasWidth: 1000,
            canvasHeight: 1000,
            colorArray: [
                0,0,0, 0,0,255, 240,255,255, 0,0,255, 200,200,200,
                255,204,0, 190,127,0, 0,48,143, 0,0,0
            ]
        }
    }

    render() {
        return (
            <div>
                <div id='mandelbrotContainer'>
                    <Mandelbrot
                        maxIterations={this.state.maxIterations}
                        canvasWidth={this.state.canvasWidth}
                        canvasHeight={this.state.canvasHeight}
                        colorArray={this.state.colorArray}>
                    </Mandelbrot>
                    <div id='controls'>
                        controls go here
                    </div>
                </div>
            </div>
        )
    }
}
