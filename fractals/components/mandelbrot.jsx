import { Component } from 'react';

const X_MIN = -2.0;
const X_MAX = 0.5;
const Y_MIN = -1.2;
const Y_MAX = 1.2;
//const colorArray = [0,0,0, 255,0,0, 0,255,0, 0,0,255];
const colorArray = [0,0,0, 0,0,255, 240,255,255, 0,0,255, 200,200,200, 255,204,0, 190,127,0, 0,48,143, 0,0,0];

export default class Mandelbrot extends Component {
    constructor() {
        super();
        this.state = {
            x_0: X_MIN,
            x_1: X_MAX,
            y_0: Y_MIN,
            y_1: Y_MAX,
            max_iterations: 255,
            wasm: null,
            mandelbrotContext: null,
            canvasHeight: 1000, //Eventually recieve these from props
            canvasWidth: 1000
        }
    }

    //Load the canvas and WASM package into state
    setupPage = async() => {
        this.setState({
            wasm: await import('../fractal_utils/pkg'),
            mandelbrotContext: this.refs.mandelbrotCanvas.getContext('2d')
        })
    }

    //Place our Mandelbrot data into the canvas
    renderMandelbrot = async () => {
        const data = this.state.wasm.mandelbrot(
            this.state.canvasWidth, this.state.canvasHeight,
            this.state.x_0, this.state.x_1, this.state.y_0,
            this.state.y_1, this.state.max_iterations, colorArray
        );
        const fractalArray = new Uint8ClampedArray(data);
        const fractalImage = new ImageData(fractalArray, this.state.canvasWidth, this.state.canvasHeight);
        this.state.mandelbrotContext.putImageData(fractalImage, 0, 0);
    }

    //Zoom in a given percentage from a particular point (x,y)
    //Positive percentage = zoom in, negative percentage = zoom out
    zoom = async (x, y, percentage) => {
        const zoomModifier = (1 - percentage) / 2;
        const x_radius = (this.state.x_1 - this.state.x_0) * zoomModifier;
        const y_radius = (this.state.y_1 - this.state.y_0) * zoomModifier;
        console.log(`x_r = ${x_radius}, y_r = ${y_radius}`);

        const new_x_0 = x - x_radius;
        const new_x_1 = x + x_radius;
        const new_y_0 = y - y_radius;
        const new_y_1 = y + y_radius;
        console.log(`NEW: ${new_x_0}, ${new_x_1}, ${new_y_0}, ${new_y_1}`);

        this.setState({
            x_0: new_x_0,
            x_1: new_x_1,
            y_0: new_y_0,
            y_1: new_y_1
        }, this.renderMandelbrot);
    }

    canvasToRealCoords = (canvasX, canvasY) => {
        console.log(`X+Y currently at (${this.state.x_0},${this.state.y_0})`);
        const realWidth  = this.state.x_1 - this.state.x_0;
        const realHeight = this.state.y_1 - this.state.y_0;

        const realX = this.state.x_0 + realWidth * (canvasX / this.state.canvasWidth);
        const realY = this.state.y_0 + realHeight * (canvasY / this.state.canvasHeight);
        return [realX, realY];
    }

    //Render the default Mandelbrot when the page loads
    async componentDidMount() {
        await this.setupPage();
        await this.renderMandelbrot();
    }

    render() {
        return (
            <div>
                <div>mandelbrot!</div>
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
            </div>
        )
    }
}
