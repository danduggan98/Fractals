use wasm_bindgen::prelude::*;

pub struct Color {
    r: u8,
    g: u8,
    b: u8
}

#[wasm_bindgen]
pub fn mandelbrot(width: u32, height: u32, x_0: f32, x_1: f32, y_0: f32, y_1: f32, max_iterations: u8) -> Vec<u8> {
    println!("Computing fractal using width {} and height {}", width, height);

    //Create the color palette based on a list of colors
    let mut color_list: Vec<Color> = Vec::new();
    color_list.push(Color { r: 0, g: 0, b: 0 }); //Full black
    color_list.push(Color { r: 0, g: 0, b: 255 }); //Full blue
    color_list.push(Color { r: 255, g: 255, b: 255 }); //Full white

    let num_colors = color_list.len();
    let mut color_palette: Vec<Color> = Vec::new();
    let section_width = max_iterations / (num_colors - 1) as u8;

    println!("max_iterations: {}", max_iterations);
    println!("section_width: {}", section_width);
    println!("num_colors: {}", num_colors);
    println!();

    for _color_idx in 0..(num_colors - 1) { //Loop through all colors to make gradients between each
        let start_color = &color_list[_color_idx];
        let end_color   = &color_list[_color_idx + 1];

        let delta_r = (end_color.r as i32 - start_color.r as i32) / section_width as i32;
        let delta_g = (end_color.g as i32 - start_color.g as i32) / section_width as i32;
        let delta_b = (end_color.b as i32 - start_color.b as i32) / section_width as i32;

        println!("(dr={}, dg={}, db={})", delta_r, delta_g, delta_b);
        println!("_color_idx: {}", _color_idx);
        
        let mut r_val = start_color.r as i32;
        let mut g_val = start_color.g as i32;
        let mut b_val = start_color.b as i32;

        for _palette_idx in 0..section_width {
            r_val += delta_r;
            g_val += delta_g;
            b_val += delta_b;
            color_palette.push(Color{ r: r_val as u8, g: g_val as u8, b: b_val as u8 });
            println!("({},{},{})", r_val, g_val, b_val);
        }
        println!("palette len: {}", color_palette.len());
    }
    
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
    let mut pixel_color: &Color;

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
            pixel_y += pixel_height;
        }
        pixel_y = y_0;
        pixel_x += pixel_width;
    }
    return results_array;
}
