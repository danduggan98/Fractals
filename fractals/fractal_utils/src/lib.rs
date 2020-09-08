use wasm_bindgen::prelude::*;

struct Color {
    r: u8,
    g: u8,
    b: u8
}

#[wasm_bindgen]
pub fn mandelbrot(width: u32, height: u32, x_0: f64, x_1: f64, y_0: f64, y_1: f64, max_iterations: u32, colors: Vec<u8>) -> Vec<u8> {
    println!("Computing fractal using width {} and height {}", width, height);

    //////// COLOR SCHEME ////////
    
    //Create the color palette based on a list of colors
    let mut color_list: Vec<Color> = Vec::new();
    for c in (0..colors.len()).step_by(3) {
        color_list.push(Color { r: colors[c], g: colors[c+1], b: colors[c+2] });
    }

    let mut color_palette: Vec<Color> = Vec::new();
    let num_colors = color_list.len();
    let section_width = max_iterations / (num_colors - 1) as u32;

    let mut start_color: &Color;
    let mut end_color: &Color = &color_list[0]; //Initialized here in case num_colors = 1
    let (mut delta_r, mut delta_g, mut delta_b): (i32, i32, i32);
    let (mut r_val, mut g_val, mut b_val): (i32, i32, i32);

    for _color_idx in 0..(num_colors - 1) { //Loop through all colors to make gradients between each
        start_color = &color_list[_color_idx];
        end_color   = &color_list[_color_idx + 1];

        delta_r = (end_color.r as i32 - start_color.r as i32) / section_width as i32;
        delta_g = (end_color.g as i32 - start_color.g as i32) / section_width as i32;
        delta_b = (end_color.b as i32 - start_color.b as i32) / section_width as i32;

        r_val = start_color.r as i32;
        g_val = start_color.g as i32;
        b_val = start_color.b as i32;

        for _palette_idx in 0..section_width {
            r_val += delta_r;
            g_val += delta_g;
            b_val += delta_b;
            color_palette.push(Color { r: r_val as u8, g: g_val as u8, b: b_val as u8 });
        }
    }

    //Rounding sometimes leaves a few indexes unfilled at the end - use the last color to fill in the gaps
    while color_palette.len() < max_iterations as usize {
        color_palette.push(Color { r: end_color.r, g: end_color.g, b: end_color.b });
    }

    //////// GENERATING THE SET ////////
    
    //Store the result in 2-dimensional vector
    let size: usize = (width * height * 4) as usize; //4x to use RGBA values
    let mut results_array = vec![0; size];

    //Convert the pixels into real coordinates in the Mandelbrot's range
    let pixel_width  = (x_1 - x_0) / (width as f64);
    let pixel_height = (y_1 - y_0) / (height as f64);
    println!("Using pixel width {} and pixel height {}", pixel_width, pixel_height);

    //Formula values
    let (mut x, mut y, mut x_squared, mut y_squared, mut iterations): (f64, f64, f64, f64, u32);
    let mut pixel_x = x_0;
    let mut pixel_y = y_0;
    let mut pixel_idx: usize = 0; //Keeps track of our location in the array
    let mut pixel_color: &Color;

    //Calculate the result for each pixel
    for _array_y in 0..height {
        for _array_x in 0..width {
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
            if iterations < max_iterations {
                pixel_color = &color_palette[iterations as usize];
                results_array[pixel_idx]     = pixel_color.r as u8;
                results_array[pixel_idx + 1] = pixel_color.g as u8;
                results_array[pixel_idx + 2] = pixel_color.b as u8;
            }
            else {
                results_array[pixel_idx]     = 0;
                results_array[pixel_idx + 1] = 0;
                results_array[pixel_idx + 2] = 0;
            }
            results_array[pixel_idx + 3] = 255;
            pixel_idx += 4;
            pixel_x += pixel_width;
        }
        pixel_x = x_0;
        pixel_y += pixel_height;
    }
    return results_array;
}
