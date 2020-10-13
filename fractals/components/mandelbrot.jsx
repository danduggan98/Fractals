import { Component } from 'react';
import styles from './../styles/mandelbrot.module.css';

export default class Mandelbrot extends Component {
    constructor() {
        super();

        this.X_MIN = -2.0;
        this.X_MAX = 0.5;
        this.Y_MIN = -1.2;
        this.Y_MAX = 1.2;
        this.MAX_X_RADIUS = (this.X_MAX - this.X_MIN) / 2;
        this.MAX_Y_RADIUS = (this.Y_MAX - this.Y_MIN) / 2;
        this.wasm = null;
        this.mandelbrotCanvas = null;
        this.mandelbrotContext = null;

        this.state = {
            x_0: this.X_MIN,
            x_1: this.X_MAX,
            y_0: this.Y_MIN,
            y_1: this.Y_MAX,
            realWidth:  this.X_MAX - this.X_MIN,
            realHeight: this.Y_MAX - this.Y_MIN,
            visibleArea: 1.0,
            rendering: false
        }
    }

    //Load the canvas and WASM package into state
    setupPage = async () => {
        this.wasm = await import('../fractal_utils/pkg');
        this.mandelbrotCanvas = document.getElementById('mandelbrotCanvas');
        this.mandelbrotContext = this.mandelbrotCanvas.getContext('2d');
    }

    //Place our Mandelbrot data into the canvas
    renderMandelbrot = async () => {
        const data = this.wasm.mandelbrot(
            this.props.canvasWidth, this.props.canvasHeight,
            this.state.x_0, this.state.x_1, this.state.y_0,
            this.state.y_1, this.props.iterations, this.props.colorArray
        );
        const fractalArray = new Uint8ClampedArray(data);
        const fractalImage = new ImageData(fractalArray, this.props.canvasWidth, this.props.canvasHeight);
        this.mandelbrotContext.putImageData(fractalImage, 0, 0);
    }

    //Zoom in a given percentage from a particular point (x,y)
    //Positive percentage = zoom in, negative percentage = zoom out
    //Automatically restricts the x, y, width, and height to fit within our boundaries
    zoom = async (x, y, percentage) => {
        const zoomModifier = 
            percentage >= 0
            ? (1 - percentage) / 2
            : 1 / (2 * (1 + percentage))
        ;

        let x_radius = this.state.realWidth  * zoomModifier;
        let y_radius = this.state.realHeight * zoomModifier;

        if (x_radius > this.MAX_X_RADIUS) x_radius = this.MAX_X_RADIUS;
        if (y_radius > this.MAX_Y_RADIUS) y_radius = this.MAX_Y_RADIUS;

        let new_x_0 = x - x_radius;
        let new_x_1 = x + x_radius;

        if (new_x_0 < this.X_MIN) { //Keep x and y within the boundaries
            new_x_0 = this.X_MIN;
            new_x_1 = new_x_0 + (2 * x_radius);
        }
        else if (new_x_1 > this.X_MAX) {
            new_x_1 = this.X_MAX;
            new_x_0 = this.X_MAX - (2 * x_radius);
        }

        let new_y_0 = y - y_radius;
        let new_y_1 = y + y_radius;

        if (new_y_0 < this.Y_MIN) {
            new_y_0 = this.Y_MIN;
            new_y_1 = new_y_0 + (2 * y_radius);
        }
        else if (new_y_1 > this.Y_MAX) {
            new_y_1 = this.Y_MAX;
            new_y_0 = this.Y_MAX - (2 * y_radius);
        }

        const currentArea = this.state.visibleArea;
        let newArea = currentArea * 2 * zoomModifier;
        newArea = (newArea > 1) ? 1 : newArea;

        console.log('Zoom initiated. Rendering is currently: ' + this.state.rendering)
        this.setState({
            x_0: new_x_0,
            x_1: new_x_1,
            y_0: new_y_0,
            y_1: new_y_1,
            realWidth:  new_x_1 - new_x_0,
            realHeight: new_y_1 - new_y_0,
            visibleArea: newArea,
            rendering: true
        }, async () => {
            console.log('In zoom callback. Before rendering the value is: ' + this.state.rendering)
            if (this.props.automaticIterations) {
                this.props.updateIterations(
                    this.getAutomaticIterations()
                );
            }

            //await new Promise(r => setInterval(r, 3000));
            await this.renderMandelbrot();

            console.log('Setting rendering back to false now...')
            this.setState({ rendering: false });
            console.log('After rendering the value is: ' + this.state.rendering)
        });
    }

    canvasToRealCoords = (canvasX, canvasY) => {
        const realX = this.state.x_0 + this.state.realWidth  * (canvasX / this.props.canvasWidth);
        const realY = this.state.y_0 + this.state.realHeight * (canvasY / this.props.canvasHeight);
        return [realX, realY];
    }

    getFocusCoordinates = () => {
        const x = this.state.x_0 + (this.state.realWidth / 2);
        const y = this.state.y_0 + (this.state.realHeight / 2);
        return [x, y];
    }

    //Return the Mandelbrot to its starting values
    resetView = () => {
        this.props.imageResetCompleted();
        this.props.resetIterations();
        this.setState({
            x_0: this.X_MIN,
            x_1: this.X_MAX,
            y_0: this.Y_MIN,
            y_1: this.Y_MAX,
            realWidth:  this.X_MAX - this.X_MIN,
            realHeight: this.Y_MAX - this.Y_MIN,
            visibleArea: 1.0
        }, this.renderMandelbrot)
    }

    //Use a power model (calculated with Desmos) to automatically determine the iterations
    //Depends only on the visible area
    /*
        POINTS USED TO CALCULATE:
        (1,100), (.5,120), (.25,150),(.0625,185),(.03125,205),(.015625,240),(.0078125,260),(.00390625,300),
        (.001953125,340),(.0009765625,360),(.000038146972,400),(.00000059605,500)
    */
    getAutomaticIterations = () => {
        const x = this.state.visibleArea;
        const a = 134.335;
        const b = -0.112475;

        return Math.ceil(a * Math.pow(x, b));
    }

    zoomOnClick = (event, multiplier) => {
        event.preventDefault();
        let adjustedX = event.pageX - this.mandelbrotCanvas.offsetLeft;
        let adjustedY = event.pageY - this.mandelbrotCanvas.offsetTop;
        let [x, y] = this.canvasToRealCoords(adjustedX, adjustedY);
        this.zoom(x, y, this.props.zoomDepth * multiplier);
    }

    //Render the default Mandelbrot when the page loads
    async componentDidMount() {
        await this.setupPage();
        await this.renderMandelbrot();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.imageResetRequested) {
            this.resetView();
        }
        if (prevProps.iterations !== this.props.iterations ||
            prevProps.colorArray !== this.props.colorArray) {
            await this.renderMandelbrot();
        }
        console.log('recieved new state')
    }

    render() {
        let [focusX, focusY] = this.getFocusCoordinates();

        return (
            <div>
                <canvas
                    id='mandelbrotCanvas'
                    className={styles.mandelbrot}
                    width={this.props.canvasWidth}
                    height={this.props.canvasHeight}
                    onClick={e => this.zoomOnClick(e, 1)} //Left click -> zoom in
                    onContextMenu={e => this.zoomOnClick(e, -1)} //Right click -> zoom out
                >
                </canvas>

                <div id={styles.details}>
                    <div id={styles.detailsLeft}>
                        <div id={styles.coordinates}>
                            Current focus: ({focusX}, {focusY})
                        </div>
                        <div id={styles.visibleArea}>
                            Visible area: {this.state.visibleArea * 100}%
                        </div>
                        <div>
                            { this.state.rendering && <div>RENDERING!!!!!</div> }
                        </div>
                    </div>
                    <button id={styles.resetViewButton} onClick={this.resetView}>Reset View</button>
                </div>
            </div>
        )
    }
}
