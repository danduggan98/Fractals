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
    
    //Convert the list of RGB values to a Color vector
    let mut color_list: Vec<Color> = Vec::new();
    for c in (0..colors.len()).step_by(3) {
        color_list.push(Color { r: colors[c], g: colors[c+1], b: colors[c+2] });
    }

    //Create a color palette with smooth gradients between each item in our Color vector
    // - E.g. given the colors red, yellow, and purple, our palette would have two consecutive gradients:
    //   one between red and yellow followed by one between yellow and purple

    let mut color_palette: Vec<Color> = Vec::new();
    let palette_size = max_iterations * 10;
    let num_gradients = color_list.len() - 1;
    let gradient_width = palette_size / num_gradients as u32; //Number of colors in each gradient

    let mut start_color: &Color;
    let mut end_color: &Color = &color_list[0];
    let (mut delta_r, mut delta_g, mut delta_b): (f64, f64, f64);
    let (mut r_val, mut g_val, mut b_val): (f64, f64, f64);

    for color_idx in 0..num_gradients {
        start_color = &color_list[color_idx];
        end_color   = &color_list[color_idx + 1];

        delta_r = (end_color.r as f64 - start_color.r as f64) / gradient_width as f64;
        delta_g = (end_color.g as f64 - start_color.g as f64) / gradient_width as f64;
        delta_b = (end_color.b as f64 - start_color.b as f64) / gradient_width as f64;
        r_val = start_color.r as f64;
        g_val = start_color.g as f64;
        b_val = start_color.b as f64;

        for _palette_idx in 0..gradient_width {
            r_val += delta_r;
            g_val += delta_g;
            b_val += delta_b;
            color_palette.push(Color { r: r_val as u8, g: g_val as u8, b: b_val as u8 });
        }
    }

    //Rounding sometimes leaves a few indexes unfilled at the end - use the last color to fill in the gaps
    while color_palette.len() < palette_size as usize {
        color_palette.push(Color { r: end_color.r, g: end_color.g, b: end_color.b });
    }

    //////// GENERATING THE SET ////////
    
    //Array to store our RGBA values
    let output_size = (width * height * 4) as usize;
    let mut results_array = vec![0; output_size];

    let (mut x, mut y, mut x_squared, mut y_squared, mut iterations): (f64, f64, f64, f64, u32);
    let mut pixel_x = x_0;
    let mut pixel_y = y_0;
    let mut pixel_idx: usize = 0; //Tracks our location in the array
    let mut pixel_color: &Color;
    let pixel_width  = (x_1 - x_0) / (width as f64);
    let pixel_height = (y_1 - y_0) / (height as f64);

    //Log constants used to determine shading
    //Credit to Christian Stigen Larsen and Linas Vepstas for the smooth coloring tricks
    let log_base = 1.0 / (2.0 as f64).log10();
    let log_half_base = (0.5 as f64).log10() * log_base;
    let spread_multiplier = ((palette_size - 1) / max_iterations) as f64;

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

            //Store the number of iterations as an RGBA color value using logarithmic shading
            if iterations < max_iterations {
                let z = x_squared + y_squared;
                let mu = ((iterations + 5) as f64) - log_half_base - (z.log10().log10() * log_base);
                let n = (mu * spread_multiplier).floor() as usize;

                pixel_color = &color_palette[n];
                results_array[pixel_idx]     = pixel_color.r as u8;
                results_array[pixel_idx + 1] = pixel_color.g as u8;
                results_array[pixel_idx + 2] = pixel_color.b as u8;
            }
            else {
                results_array[pixel_idx]     = 0;
                results_array[pixel_idx + 1] = 0;
                results_array[pixel_idx + 2] = 0;
            }
            results_array[pixel_idx + 3] = 255; //All values are fully opaque
            pixel_idx += 4;
            pixel_x += pixel_width;
        }
        pixel_x = x_0;
        pixel_y += pixel_height;
    }
    return results_array;
}
