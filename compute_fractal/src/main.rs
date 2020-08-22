// Performance improvements
// - Use ndarrays instead of vectors for faster traversal
// - Try smaller data types for certain values
// - Add benchmarking using the time crate

fn main() {
    const MAX_ITERATIONS: u32 = 100;
    let result = compute_fractal(20, 15, 0.0, 0.0, MAX_ITERATIONS); //Test value

    println!("There were {} points on the mandelbrot", check_fractal(result, MAX_ITERATIONS));
}

fn compute_fractal(width: usize, height: usize, x_0: f32, y_0: f32, max_iterations: u32) -> Vec<Vec<u32>> {
    println!("Computing fractal with width {} and height {}", width, height);
    
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

    //Calculate the result for each pixel
    let mut x: f32;
    let mut y: f32;
    let mut x_squared: f32;
    let mut y_squared: f32;
    let mut iterations: u32;

    //iterate
    let mut pixel_x = X_MIN as f32;
    let mut pixel_y = Y_MIN as f32;
    let mut array_row: usize = 0;
    let mut array_col: usize = 0;

    while pixel_x < X_MAX {
        while pixel_y < Y_MAX {
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
            results_array[array_row][array_col] = iterations;

            println!("({},{}) = {}", pixel_x, pixel_y, iterations);
            pixel_y += pixel_height;
            array_col += 1;
        }
        pixel_y = Y_MIN;
        pixel_x += pixel_width;
        array_row += 1;
        array_col = 0;
    }
    return results_array;
}

//Helper function to check if the calculation is working
fn check_fractal(data: Vec<Vec<u32>>, max: u32) -> u32 {
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
}
