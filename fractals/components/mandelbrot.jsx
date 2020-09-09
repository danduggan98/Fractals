import { Component } from 'react';

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
        this.mandelbrotContext = null;

        this.state = {
            x_0: this.X_MIN,
            x_1: this.X_MAX,
            y_0: this.Y_MIN,
            y_1: this.Y_MAX,
            realWidth:  this.X_MAX - this.X_MIN,
            realHeight: this.Y_MAX - this.Y_MIN,
            max_iterations: 255,
            canvasHeight: 800, //Eventually recieve these from props
            canvasWidth: 800,
            colorArray: [
                0,0,0, 0,0,255, 240,255,255, 0,0,255, 200,200,200,
                255,204,0, 190,127,0, 0,48,143, 0,0,0
            ]
        }
    }

    //Load the canvas and WASM package into state
    setupPage = async() => {
        this.wasm = await import('../fractal_utils/pkg');
        this.mandelbrotContext = this.refs.mandelbrotCanvas.getContext('2d');
    }

    //Place our Mandelbrot data into the canvas
    renderMandelbrot = async () => {
        const data = this.wasm.mandelbrot(
            this.state.canvasWidth, this.state.canvasHeight,
            this.state.x_0, this.state.x_1, this.state.y_0,
            this.state.y_1, this.state.max_iterations, this.state.colorArray
        );
        const fractalArray = new Uint8ClampedArray(data);
        const fractalImage = new ImageData(fractalArray, this.state.canvasWidth, this.state.canvasHeight);
        this.mandelbrotContext.putImageData(fractalImage, 0, 0);
    }

    //Zoom in a given percentage from a particular point (x,y)
    //Positive percentage = zoom in, negative percentage = zoom out
    //Automatically restricts the x, y, width, and height to fit within our boundaries
    zoom = async (x, y, percentage) => {
        const zoomModifier = (1 - percentage) / 2;
        let x_radius = this.state.realWidth  * zoomModifier;
        let y_radius = this.state.realHeight * zoomModifier;

        if (x_radius > this.MAX_X_RADIUS) x_radius = this.MAX_X_RADIUS;
        if (y_radius > this.MAX_Y_RADIUS) y_radius = this.MAX_Y_RADIUS;
        console.log(`x_r = ${x_radius}, y_r = ${y_radius}`);

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
        console.log(`NEW: x_0: ${new_x_0}, x_1: ${new_x_1}, y_0: ${new_y_0}, y_1: ${new_y_1}`);

        this.setState({
            x_0: new_x_0,
            x_1: new_x_1,
            y_0: new_y_0,
            y_1: new_y_1,
            realWidth:  new_x_1 - new_x_0,
            realHeight: new_y_1 - new_y_0,
        }, this.renderMandelbrot);
    }

    canvasToRealCoords = (canvasX, canvasY) => {
        console.log(`X+Y currently at (${this.state.x_0},${this.state.y_0})`);
        const realX = this.state.x_0 + this.state.realWidth * (canvasX / this.state.canvasWidth);
        const realY = this.state.y_0 + this.state.realHeight * (canvasY / this.state.canvasHeight);
        return [realX, realY];
    }

    getFocusCoordinates = () => {
        const x = this.state.x_0 + (this.state.realWidth / 2);
        const y = this.state.y_0 + (this.state.realHeight / 2);
        return [x, y];
    }

    //Render the default Mandelbrot when the page loads
    async componentDidMount() {
        await this.setupPage();
        await this.renderMandelbrot();
    }

    render() {
        let [focusX, focusY] = this.getFocusCoordinates();
        return (
            <div>
                <canvas
                    ref='mandelbrotCanvas'
                    width={this.state.canvasWidth}
                    height={this.state.canvasHeight}

                    //Left click -> zoom in
                    onClick={e => {
                        e.preventDefault();
                        console.log(`Clicked at (${e.clientX},${e.clientY})`);
                        let [x, y] = this.canvasToRealCoords(e.clientX, e.clientY);
                        console.log(`Zooming in to (${x},${y})`);
                        this.zoom(x, y, 0.5);
                    }}

                    //Right click -> zoom out
                    onContextMenu={e => {
                        e.preventDefault(); //Don't show the right-click menu
                        console.log(`Clicked at (${e.clientX},${e.clientY})`);
                        let [x, y] = this.canvasToRealCoords(e.clientX, e.clientY);
                        console.log(`Zooming in to (${x},${y})`);
                        this.zoom(x, y, -0.5);
                    }}>
                </canvas>
                <div id='coordinates'>
                    Current focus: ({focusX}, {focusY});
                </div>
            </div>
        )
    }
}
