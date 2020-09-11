import { Component } from 'react';
import { Range } from 'react-range';
import Mandelbrot from './mandelbrot';
import styles from './../styles/controller.module.css';

export default class Controller extends Component {
    constructor() {
        super();

        this.minIterations = 8;
        this.maxIterations = 512;
        let startingIterations = Math.ceil(this.maxIterations / 2);

        this.minZoom = 0.1;
        this.maxZoom = 0.9;
        let startingZoom = (this.minZoom + this.maxZoom) / 2;

        this.state = {
            canvasWidth: 800,
            canvasHeight: 800,
            colorArray: [
                0,0,0, 0,0,255, 240,255,255, 200,200,200,
                255,204,0, 190,127,0, 0,48,143, 0,0,0
            ],
            tempIterations: startingIterations,
            currentIterations: startingIterations,
            tempZoom: startingZoom,
            currentZoom: startingZoom,
            resetRequested: false
        }
    }

    componentDidMount() {
        let diameter = window.innerHeight * 0.88;
        this.setState({
            canvasWidth: diameter,
            canvasHeight: diameter
        })
    }

    reset = () => {
        this.setState({
            resetRequested: true
        })
    }

    resetCompleted = () => {
        this.setState({
            resetRequested: false
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
                        colorArray={this.state.colorArray}
                        zoomDepth={this.state.currentZoom}
                        reset={this.state.resetRequested}
                        resetCompleted={this.resetCompleted.bind(this)}>
                    </Mandelbrot>

                    <div id={styles.controls}>
                        <div className={styles.controlContainer}>
                            <div className={styles.controlCounter}>Iterations: {this.state.tempIterations}</div>
                            <div className={styles.controlSlider}>
                                <div className={styles.leftSliderLabel}>Less</div>

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
                                                height: '5px',
                                                width: '100%',
                                                borderRadius: '20px',
                                                backgroundColor: 'white',
                                                transform: 'translate(0px, 7px)'
                                            }}>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '26px',
                                                width: '26px',
                                                backgroundColor: 'darkblue',
                                                borderRadius: '20px',
                                                border: '2px solid lightgrey'
                                            }}>
                                        </div>
                                    )}>
                                </Range>

                                <div className={styles.rightSliderLabel}>More</div>
                            </div>
                            <div className={styles.controlDescription}>
                                More iterations yield a crisper image but take longer to calculate
                            </div>
                        </div>

                        <div className={styles.controlContainer}>
                            <div className={styles.controlCounter}>Zoom Speed: {(100 * this.state.tempZoom).toFixed(0)}%</div>
                            <div className={styles.controlSlider}>
                                <div className={styles.leftSliderLabel}>Less</div>

                                <Range
                                    step={0.01}
                                    min={this.minZoom}
                                    max={this.maxZoom}
                                    values={[this.state.tempZoom]}
                                    onChange={values => this.setState({ tempZoom: values[0] })}
                                    onFinalChange={values => this.setState({ currentZoom: values[0] })}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '5px',
                                                width: '100%',
                                                borderRadius: '20px',
                                                backgroundColor: 'white',
                                                transform: 'translate(0px, 7px)'
                                            }}>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '26px',
                                                width: '26px',
                                                backgroundColor: 'darkblue',
                                                borderRadius: '20px',
                                                border: '2px solid lightgrey'
                                            }}>
                                        </div>
                                    )}>
                                </Range>

                                <div className={styles.rightSliderLabel}>More</div>
                            </div>
                            <div className={styles.controlDescription}>
                                Go deeper with each zoom
                            </div>
                        </div>
                        
                        <div>item 3</div>

                        <button id={styles.resetButton} onClick={this.reset}>Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}
