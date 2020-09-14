import { Component } from 'react';
import { Range } from 'react-range';
import { ChromePicker } from 'react-color';
import Mandelbrot from './mandelbrot';
import styles from './../styles/controller.module.css';

export default class Controller extends Component {
    constructor() {
        super();

        this.minIterations = 8;
        this.maxIterations = 1000;
        this.startingIterations = 100;

        this.minZoom = 0.1;
        this.maxZoom = 0.9;
        this.startingZoom = (this.minZoom + this.maxZoom) / 2;

        this.colorPreset1 = [0,0,0, 0,0,255, 255,255,0, 255,255,255, 255,255,255]; //Blue, Yellow, White (Default)
        this.colorPreset2 = [0,0,0, 226,85,9, 255,243,71, 255,255,255, 255,255,255]; //Orange, Yellow, White (Blaze)
        this.colorPreset3 = [0,0,0, 24,171,34, 9,222,239, 231,74,235, 255,255,255]; //Green, Cyan, Purple (Neon)
        this.colorPreset4 = [0,0,0, 211,3,3, 184,184,184, 255,255,255, 255,255,255]; //Red, Grey, White (Sith)
        this.colorPreset5 = [0,0,0, 255,255,255, 0,255,255, 255,255,255, 255,255,255]; //White, Cyan, White (Winter)
        this.colorPreset6 = [0,0,0, 182,41,244, 255,255,255, 61,3,151, 255,255,255]; //Light Purple, White, Dark Purple (Amethyst)

        this.state = {
            canvasWidth: 800,
            canvasHeight: 800,
            colorArray: this.colorPreset1,
            tempIterations: this.startingIterations,
            currentIterations: this.startingIterations,
            tempZoom: this.startingZoom,
            currentZoom: this.startingZoom,
            imageResetRequested: false,
            primaryColor: { r: this.colorPreset1[3], g: this.colorPreset1[4], b: this.colorPreset1[5] },
            secondaryColor: { r: this.colorPreset1[6], g: this.colorPreset1[7], b: this.colorPreset1[8] },
            tertiaryColor: { r: this.colorPreset1[9], g: this.colorPreset1[10], b: this.colorPreset1[11] },
            selectedPreset: 1,
            automaticIterations: false
        }
    }

    componentDidMount() {
        let diameter = window.innerHeight * 0.88;
        this.setState({
            canvasWidth: diameter,
            canvasHeight: diameter
        });
    }

    //Ask the Mandelbrot component to render with the starting boundaries
    requestImageReset = () => {
        this.setState({
            imageResetRequested: true
        });
    }

    //Child triggers this when a reset is complete to avoid multiple re-renders
    imageResetCompleted = () => {
        this.setState({
            imageResetRequested: false
        });
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
                255,255,255
            ]
        });
    }

    //Used from the preset selector
    selectNewPreset = (event) => {
        const selection = Number(event.target.value);

        this.setState({
            selectedPreset: selection
        }, this.loadColorPreset);
    }

    //Can be called anywhere
    changePreset = (selection) => {
        this.setState({
            selectedPreset: selection
        }, this.loadColorPreset);
    }

    loadColorPreset = () => {
        let selection = this.state.selectedPreset;
        let preset;

        switch(selection) {
            case 1: preset = this.colorPreset1; break;
            case 2: preset = this.colorPreset2; break;
            case 3: preset = this.colorPreset3; break;
            case 4: preset = this.colorPreset4; break;
            case 5: preset = this.colorPreset5; break;
            case 6: preset = this.colorPreset6; break;
            default: preset = this.colorPreset1; break;
        }

        this.setState({
            primaryColor: { r: preset[3], g: preset[4], b: preset[5] },
            secondaryColor: { r: preset[6], g: preset[7], b: preset[8] },
            tertiaryColor: { r: preset[9], g: preset[10], b: preset[11] }
        }, this.updateColorArray);
    }

    resetZoom = () => {
        this.setState({
            tempZoom: this.startingZoom,
            currentZoom: this.startingZoom
        });
    }

    resetIterations = () => {
        this.setState({
            tempIterations: this.startingIterations,
            currentIterations: this.startingIterations
        });
    }

    updateIterations = (iterations) => {
        this.setState({
            tempIterations: iterations,
            currentIterations: iterations
        })
    }

    changeAutomaticIterations = () => {
        this.setState({
            automaticIterations: (!this.state.automaticIterations)
        })
    }

    startOver = () => {
        this.requestImageReset();
        this.resetIterations();
        this.resetZoom();
        this.changePreset(1);
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
                        imageResetRequested={this.state.imageResetRequested}
                        automaticIterations={this.state.automaticIterations}
                        updateIterations={this.updateIterations.bind(this)}
                        imageResetCompleted={this.imageResetCompleted.bind(this)}
                        resetIterations={this.resetIterations.bind(this)}>
                    </Mandelbrot>

                    <div id={styles.controls}>
                        <div className={styles.controlContainer}>
                            <div className={styles.propertyHeader}>
                                <div className={styles.controlCounter}>
                                    Iterations: {this.state.tempIterations}
                                </div>
                                <div id={styles.iterationsHeaderRight}>
                                    <div id={styles.autoCheckboxContainer}>
                                        <input
                                            id={styles.autoCheckbox}
                                            type='checkbox'
                                            name='auto'
                                            value={this.state.automaticIterations}
                                            onChange={this.changeAutomaticIterations}>
                                        </input>
                                        <label id={styles.autoCheckBoxLabel} for='auto'>
                                            Automatic
                                        </label>
                                    </div>
                                    <button
                                        className={styles.propertyResetButton}
                                        onClick={this.resetIterations}>
                                            Reset
                                    </button>
                                </div>
                            </div>
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
                            <div className={styles.propertyHeader}>
                                <div className={styles.controlCounter}>Zoom Speed: {(100 * this.state.tempZoom).toFixed(0)}%</div>
                                <button className={styles.propertyResetButton} onClick={this.resetZoom}>Reset</button>
                            </div>
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
                            <div id={styles.presetSelector}>
                                <span id={styles.presetLabel}>Presets:</span>
                                <select
                                    id={styles.colorPresets}
                                    onChange={this.selectNewPreset}
                                    value={this.state.selectedPreset}>
                                        <option value='1'>Default</option>
                                        <option value='2'>Blaze</option>
                                        <option value='3'>Neon</option>
                                        <option value='4'>Sith</option>
                                        <option value='5'>Winter</option>
                                        <option value='6'>Amethyst</option>
                                </select>
                            </div>
                            <div id={styles.colorBoxArea}>
                                <span id={styles.customLabel}>Custom:</span>
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

                                <button id={styles.colorResetButton} onClick={this.loadColorPreset}>Reset</button>
                            </div>
                            <div className={styles.controlDescription}>Select a preset color scheme or choose your own</div>
                        </div>

                        <button id={styles.startOverButton} onClick={this.startOver}>Start Over</button>
                    </div>
                </div>
            </div>
        )
    }
}
