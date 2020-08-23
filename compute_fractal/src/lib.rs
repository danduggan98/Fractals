use wasm_bindgen::prelude::*;

// Performance improvements
// - Use ndarrays instead of vectors for faster traversal (or a single vector)
// - Try smaller data types for certain values
// - Add benchmarking using the time crate

/*fn main() {
    const MAX_ITERATIONS: u32 = 100;
    let result = compute_fractal(200, 150, 0.0, 0.0, MAX_ITERATIONS); //Test value

    println!("There were {} points on the mandelbrot", check_fractal(result, MAX_ITERATIONS));
}*/

#[wasm_bindgen]
pub fn compute_fractal(width: usize, height: usize, x_0: f32, y_0: f32, max_iterations: usize) -> /*Vec<Vec<usize>>*/Vec<u32> {
    println!("Computing fractal using width {} and height {}", width, height);
    
    //Store the result in 2-dimensional vector
    let mut results_array = vec![vec![0; width]; height];

    //Convert the pixels into real coordinates in the Mandelbrot's range
    const X_MIN: f32 = -2.0;
    const X_MAX: f32 = 1.0;
    const Y_MIN: f32 = -1.0;
    const Y_MAX: f32 = 1.0;

    let pixel_width = (X_MAX - X_MIN) / (width as f32);
    let pixel_height = (Y_MAX - Y_MIN) / (height as f32);

    println!("Using pixel width {} and pixel height {}", pixel_width, pixel_height);

    //Formula values
    let (mut x, mut y, mut x_squared, mut y_squared, mut iterations): (f32, f32, f32, f32, usize);
    let (mut array_col, mut array_row): (usize, usize) = (0, 0);
    let mut pixel_x = X_MIN as f32;
    let mut pixel_y = Y_MIN as f32;

    //Calculate the result for each pixel
    while array_col < width {
        while array_row < height {
            x = pixel_x;
            y = pixel_y;
            x_squared = 0.0;
            y_squared = 0.0;
            iterations = 0;

            while x_squared + y_squared <= 4.0 && iterations < max_iterations {
                y = 2.0 * x * y + y_0;
                x = x_squared - y_squared + x_0;
                x_squared = x * x;
                y_squared = y * y;
                iterations += 1;
            }

            //Convert the number of iterations to a color value, then store it
            //Need a const to multiply the iteration num by to map it between white and black
            //..convert..
            //println!("({},{}) = ({},{}) = {}", array_col, array_row, pixel_x, pixel_y, iterations);
            results_array[array_row][array_col] = iterations;

            //println!("({},{}) = {}", pixel_x, pixel_y, iterations);
            pixel_y += pixel_height;
            array_row += 1;
        }
        pixel_y = Y_MIN;
        array_row = 0;
        pixel_x += pixel_width;
        array_col += 1;
    }
    //return results_array;
    return vec![1,2,3];
}

//Helper function to check if the calculation is working
/*fn check_fractal(data: Vec<Vec<u32>>, max: u32) -> u32 {
    let mut members: u32 = 0;

    //Count the number of points that fall within the set
    for row in data {
        for col in row {
            if col < max {
                members += 1;
            }
        }
    }
    return members;
}*/
