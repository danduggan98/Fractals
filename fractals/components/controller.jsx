import { Component } from 'react';
import { Range } from 'react-range';
import Mandelbrot from './mandelbrot';
import styles from './../styles/controller.module.css';

export default class Controller extends Component {
    constructor() {
        super();

        this.minIterations = 8;
        this.maxIterations = 255;
        let startingIterations = Math.ceil(this.maxIterations / 2);

        this.state = {
            canvasWidth: 800,
            canvasHeight: 800,
            colorArray: [
                0,0,0, 0,0,255, 240,255,255, 200,200,200,
                255,204,0, 190,127,0, 0,48,143, 0,0,0
            ],
            tempIterations: startingIterations,
            currentIterations: startingIterations
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
                        iterations={this.state.currentIterations}
                        canvasWidth={this.state.canvasWidth}
                        canvasHeight={this.state.canvasHeight}
                        colorArray={this.state.colorArray}>
                    </Mandelbrot>
                    <div id={styles.controls}>
                        controls go here

                        <div id={styles.iterationSliderContainer}>
                            <div id={styles.iterationCounter}>Iterations: {this.state.tempIterations} </div>
                            <div id={styles.iterationSlider}>
                                <div id={styles.leftSliderLabel}>
                                    Less
                                </div>
                                <Range
                                    step={1}
                                    min={this.minIterations}
                                    max={this.maxIterations}
                                    values={[this.state.tempIterations]}
                                    onChange={values => this.setState({ tempIterations: values[0] })}
                                    onFinalChange={values => this.setState({ currentIterations: values[0] })}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '3px',
                                                width: '100%',
                                                backgroundColor: 'white'
                                            }}>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '28px',
                                                width: '28px',
                                                backgroundColor: 'darkblue',
                                                borderRadius: '20px',
                                                border: '2px solid lightgrey'
                                            }}>
                                        </div>
                                    )}>
                                </Range>
                                <div id={styles.rightSliderLabel}>More</div>
                            </div>
                            <div id={styles.iterationDescription}>
                                More iterations yield a crisper image but take longer to calculate
                            </div>
                        </div>
                        <div>item 2</div>
                    </div>
                </div>
            </div>
        )
    }
}
