//Load fractal methods from WASM
const source = require('fs').readFileSync('./fractal_utils/pkg/fractal_utils_bg.wasm');
let fractal_utils;
let MANDELBROT;

(async function loadWASM() {
    fractal_utils = await WebAssembly.instantiate(new Uint8Array(source));
    MANDELBROT = fractal_utils.instance.exports.mandelbrot();
    console.log('- Fractal utilities loaded from WASM');
})();

//Set up express app
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/mandelbrot', (req, res) => { //Add parameters
    res.status(200).send('NICE');
});

//Handle 404 errors
app.use((err, req, res, next) => {
    res.status(404).send('Error 404 - Page Not Found');
});

//Handle 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack); //Log error details
    res.status(500).send('Error 500 - Internal Server Error');
});

const server = app.listen(PORT, () => {
    console.log('- Fractals server listening on port', PORT);
});
