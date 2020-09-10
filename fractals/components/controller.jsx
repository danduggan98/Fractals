import { Component } from 'react';
import Mandelbrot from './mandelbrot';
import styles from './../styles/controller.module.css';

export default class Controller extends Component {
    constructor() {
        super();
        this.state = {
            maxIterations: 128,
            canvasWidth: 800,
            canvasHeight: 800,
            colorArray: [
                0,0,0, 0,0,255, 240,255,255, 0,0,255, 200,200,200,
                255,204,0, 190,127,0, 0,48,143, 0,0,0
            ]
        }
    }

    componentDidMount() {
        let diameter = window.innerHeight * 0.88;
        this.setState({
            canvasWidth: diameter,
            canvasHeight: diameter
        })
    }

    render() {
        return (
            <div>
                <div id={styles.mandelbrotContainer}>
                    <Mandelbrot
                        maxIterations={this.state.maxIterations}
                        canvasWidth={this.state.canvasWidth}
                        canvasHeight={this.state.canvasHeight}
                        colorArray={this.state.colorArray}>
                    </Mandelbrot>
                    <div id={styles.controls}>
                        controls go here
                        <div>item 1</div>
                        <div>item 2</div>
                    </div>
                </div>
            </div>
        )
    }
}
