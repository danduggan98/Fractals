fn main() {
    let result = compute_fractal(100, 100, 0.0, 0.0, 100); //Test value
    println!("There were {} points on the mandelbrot", check_fractal(result));
}

fn compute_fractal(width: i32, height: i32, x_0: f32, y_0: f32, max_iterations: u32) -> Vec<u32> {
    println!("Computing fractal with width {} and height {}", width, height);
    
    //Store the result in 2-dimensional array (FIGURE THIS OUT)
    let mut output = Vec::new();

    //Convert the pixels into real coordinates
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

    while pixel_x < X_MAX {
        while pixel_y < Y_MAX {
            y = 0.0;
            x_squared = 0.0;
            y_squared = 0.0;
            iterations = 0;

            while x_squared + y_squared <= 4.0 && iterations < max_iterations {
                x = x_squared - y_squared + x_0;
                y = 2.0 * x * y + y_0;
                x_squared = x * x;
                y_squared = y * y;
                iterations += 1;
            }
            pixel_y += pixel_height;

            //Convert the number of iterations to a color value, then store it
            //Need a const to multiply the iteration num by to map it between white and black
            //..convert..
            output.push(iterations);
            println!("({},{}) = {}", pixel_x, pixel_y, iterations);

        }
        pixel_x += pixel_width;
    }
    return output;
}

//Helper function to check if the calculation is working
fn check_fractal(data: Vec<u32>) -> u32 {
    let mut members: u32 = 0;
    for point in data.iter() {
        if point < &100 {
            members += 1;
        }
    }
    return members;
}
