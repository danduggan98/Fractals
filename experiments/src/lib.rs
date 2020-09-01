use wasm_bindgen::prelude::*;

pub struct Color {
    r: f32, 
    g: f32,
    b: f32
}

#[wasm_bindgen]
pub fn mandelbrot(width: u32, height: u32, x_0: f32, x_1: f32, y_0: f32, y_1: f32,
    max_iterations: u8, r_value: f32, g_value: f32, b_value: f32) -> Vec<u8> {

    println!("Computing fractal using width {} and height {}", width, height);

    //Determine the color palette
    let mut color_palette: Vec<Color> = Vec::new();

    color_palette.push(Color{ r: 0.0, g: 0.0, b: 1.0 });
    color_palette.push(Color{ r: 1.0, g: 0.0, b: 0.0 });
    color_palette.push(Color{ r: 0.0, g: 1.0, b: 0.0 });

    let palette_bucket_width = ((max_iterations as usize + (color_palette.len() - 1 as usize)) as usize) / color_palette.len();
    
    //Store the result in 2-dimensional vector
    let size: usize = (width * height * 4) as usize; //4x to use RGBA values
    let mut results_array = vec![0; size];

    //Convert the pixels into real coordinates in the Mandelbrot's range
    let pixel_width  = (x_1 - x_0) / (width as f32);
    let pixel_height = (y_1 - y_0) / (height as f32);
    println!("Using pixel width {} and pixel height {}", pixel_width, pixel_height);

    //Formula values
    let (mut x, mut y, mut x_squared, mut y_squared, mut iterations): (f32, f32, f32, f32, u8);
    let mut pixel_x = x_0;
    let mut pixel_y = y_0;
    let mut pixel_idx: usize; //Keeps track of our location in the array

    //Calculate the result for each pixel
    for array_x in 0..width {
        for array_y in 0..height {
            x = 0.0;
            y = 0.0;
            x_squared = 0.0;
            y_squared = 0.0;
            iterations = 0;

            while x_squared + y_squared <= 4.0 && iterations < max_iterations {
                y = 2.0 * x * y + pixel_y;
                x = x_squared - y_squared + pixel_x;
                x_squared = x * x;
                y_squared = y * y;
                iterations += 1;
            }

            //Store the number of iterations as an RGBA color value
            pixel_idx = 4 * (array_x + width * array_y) as usize;

            if iterations < max_iterations {
                let palette_idx = (iterations as usize) / palette_bucket_width;
                //println!("iterations = {}, palette_idx = {}", iterations, palette_idx);
                let next_color = &color_palette[palette_idx];

                results_array[pixel_idx]     = 255 * (next_color.r as u8);
                results_array[pixel_idx + 1] = 255 * (next_color.g as u8);
                results_array[pixel_idx + 2] = 255 * (next_color.b as u8);
            }
            else {
                results_array[pixel_idx]     = 0;
                results_array[pixel_idx + 1] = 0;
                results_array[pixel_idx + 2] = 0;
            }
            results_array[pixel_idx + 3] = 255;
            pixel_y += pixel_height;
        }
        pixel_y = y_0;
        pixel_x += pixel_width;
    }
    return results_array;
}
