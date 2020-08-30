use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn mandelbrot(width: u32, height: u32, x_0: f32, y_0: f32, max_iterations: u8) -> Vec<u8> {
    println!("Computing fractal using width {} and height {}", width, height);
    
    //Store the result in 2-dimensional vector
    let size: usize = (width * height * 4) as usize; //4x to use RGBA values
    let mut results_array = vec![0; size];

    //Convert the pixels into real coordinates in the Mandelbrot's range
    const X_MIN: f32 = -2.0;
    const X_MAX: f32 = 1.0;
    const Y_MIN: f32 = -1.0;
    const Y_MAX: f32 = 1.0;

    let pixel_width = (X_MAX - X_MIN) / (width as f32);
    let pixel_height = (Y_MAX - Y_MIN) / (height as f32);

    println!("Using pixel width {} and pixel height {}", pixel_width, pixel_height);

    //Formula values
    let (mut x, mut y, mut x_squared, mut y_squared, mut iterations): (f32, f32, f32, f32, u8);
    let mut pixel_x = X_MIN as f32;
    let mut pixel_y = Y_MIN as f32;
    let mut pixel_idx: usize; //Keeps track of our location in the array

    //Calculate the result for each pixel
    for array_x in 0..width {
        for array_y in 0..height {
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

            //Convert the number of iterations to a color value in the form RGBA
            //THIS IS WHERE WE CAN ADD CUSTOM COLOR SCHEMES
            pixel_idx = 4 * (array_x * height + array_y) as usize;

            //Just for initial tests - change later
            results_array[pixel_idx] = 0;
            results_array[pixel_idx + 1] = 0;
            results_array[pixel_idx + 2] = iterations * 2;
            results_array[pixel_idx + 3] = 255;

            pixel_y += pixel_height;
        }
        pixel_y = Y_MIN;
        pixel_x += pixel_width;
    }
    return results_array;
}
