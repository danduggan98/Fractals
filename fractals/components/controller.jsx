import { Component } from 'react';
import { Range } from 'react-range';
import Mandelbrot from './mandelbrot';
import styles from './../styles/controller.module.css';

export default class Controller extends Component {
    constructor() {
        super();

        this.minIterations = 8;
        this.maxIterations = 255;

        this.state = {
            currentIterations: 128,
            finalIterations: 128,
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
                        iterations={this.state.finalIterations}
                        canvasWidth={this.state.canvasWidth}
                        canvasHeight={this.state.canvasHeight}
                        colorArray={this.state.colorArray}>
                    </Mandelbrot>
                    <div id={styles.controls}>
                        controls go here

                        <div id='iterationSliderContainer'>
                            <div>Less</div>
                            <Range
                                step={1}
                                min={this.minIterations}
                                max={this.maxIterations}
                                values={[this.state.currentIterations]}
                                onChange={values => this.setState({ currentIterations: values[0] })}
                                onFinalChange={values => {
                                    this.setState({ finalIterations: values[0]})
                                    console.log('Final value:', values[0])
                                }}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '3px',
                                            width: '100%',
                                            backgroundColor: '#ccc'
                                        }}>
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '30px',
                                            width: '30px',
                                            backgroundColor: '#ccc',
                                            borderRadius: '20px',
                                            border: '2px solid darkgrey'
                                        }}>
                                    </div>
                                )}>
                            </Range>
                            <div>More</div>
                        </div>
                        <div>item 2</div>
                    </div>
                </div>
            </div>
        )
    }
}
