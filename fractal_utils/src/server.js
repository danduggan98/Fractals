const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/mandelbrot', (req, res) => { //Add parameters
    res.send('Nice');
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