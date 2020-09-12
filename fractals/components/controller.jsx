import { Component } from 'react';
import { Range } from 'react-range';
import { ChromePicker } from 'react-color';
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

        this.startingPrimaryColor = { r: 0, g: 0, b: 255 };
        this.startingSecondaryColor = { r: 255, g: 243, b: 71 };
        this.startingTertiaryColor = { r: 255, g: 255, b: 255 };

        this.state = {
            canvasWidth: 800,
            canvasHeight: 800,
            colorArray: [
                0,0,0,
                this.startingPrimaryColor.r, this.startingPrimaryColor.g, this.startingPrimaryColor.b,
                this.startingSecondaryColor.r, this.startingSecondaryColor.g, this.startingSecondaryColor.b,
                this.startingTertiaryColor.r, this.startingTertiaryColor.g, this.startingTertiaryColor.b,
                0,0,0
            ],
            tempIterations: startingIterations,
            currentIterations: startingIterations,
            tempZoom: startingZoom,
            currentZoom: startingZoom,
            resetRequested: false,
            primaryColor: this.startingPrimaryColor,
            secondaryColor: this.startingSecondaryColor,
            tertiaryColor: this.startingTertiaryColor
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

    updatePrimaryColor = (color) => {
        this.setState({
            primaryColor: color.rgb
        }, this.updateColorArray);
    }

    updateSecondaryColor = (color) => {
        this.setState({
            secondaryColor: color.rgb
        }, this.updateColorArray);
    }

    updateTertiaryColor = (color) => {
        this.setState({
            tertiaryColor: color.rgb
        }, this.updateColorArray);
    }

    updateColorArray = () => {
        let P = this.state.primaryColor;
        let S = this.state.secondaryColor;
        let T = this.state.tertiaryColor;

        this.setState({
            colorArray: [
                0,0,0,
                P.r, P.g, P.b,
                S.r, S.g, S.b,
                T.r, T.g, T.b,
                0,0,0
            ]
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
                        
                        <div className={styles.controlContainer}>
                            <div className={styles.controlCounter}>Color Scheme</div>
                            <div>Presets:</div>
                            <div>Custom:</div>
                            <div id={styles.colorBoxArea}>

                                <div className={styles.colorBoxContainer}>
                                    <div
                                        className={styles.colorBox}
                                        style={{
                                            backgroundColor: `rgb(
                                                ${this.state.primaryColor.r},
                                                ${this.state.primaryColor.g},
                                                ${this.state.primaryColor.b}
                                            )`
                                        }}>
                                        <div className={styles.dropdownColorPicker}>
                                            <ChromePicker
                                                disableAlpha={true}
                                                color={this.state.primaryColor}
                                                onChangeComplete={this.updatePrimaryColor}
                                            />
                                        </div>
                                    </div>
                                    Primary
                                </div>

                                <div className={styles.colorBoxContainer}>
                                    <div
                                        className={styles.colorBox}
                                        style={{
                                            backgroundColor: `rgb(
                                                ${this.state.secondaryColor.r},
                                                ${this.state.secondaryColor.g},
                                                ${this.state.secondaryColor.b}
                                            )`
                                        }}>
                                        <div className={styles.dropdownColorPicker}>
                                            <ChromePicker
                                                disableAlpha={true}
                                                color={this.state.secondaryColor}
                                                onChangeComplete={this.updateSecondaryColor}
                                            />
                                        </div>
                                    </div>
                                    Secondary
                                </div>

                                <div className={styles.colorBoxContainer}>
                                    <div
                                        className={styles.colorBox}
                                        style={{
                                            backgroundColor: `rgb(
                                                ${this.state.tertiaryColor.r},
                                                ${this.state.tertiaryColor.g},
                                                ${this.state.tertiaryColor.b}
                                            )`
                                        }}>
                                        <div className={styles.dropdownColorPicker}>
                                            <ChromePicker
                                                disableAlpha={true}
                                                color={this.state.tertiaryColor}
                                                onChangeComplete={this.updateTertiaryColor}
                                            />
                                        </div>
                                    </div>
                                    Tertiary
                                </div>

                            </div>
                        </div>

                        <button id={styles.resetButton} onClick={this.reset}>Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}
