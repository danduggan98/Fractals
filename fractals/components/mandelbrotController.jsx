import { Component } from 'react';
import Mandelbrot from '../components/mandelbrot';

export default class MandelbrotController extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <div id='mandelbrotContainer'>
                    <Mandelbrot iterations={128}/>
                    <div id='controls'>
                        controls go here
                    </div>
                </div>
            </div>
        )
    }
}