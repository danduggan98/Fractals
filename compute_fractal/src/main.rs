fn main() {
    let result = compute_fractal(1000, 1000, 0.0, 0.0, 100); //Test value
    println!("There were {} points on the mandelbrot", check_fractal(result));
}

fn compute_fractal(width: u32, height: u32, x_0: f32, y_0: f32, max_iterations: u32) -> Vec<u32> {
    println!("Computing fractal with width {} and height {}", width, height);
    let mut output = Vec::new();

    /*
    //Natural bounds of the mandelbrot
    let range_horizontal = 3;
    let range_vertical = 2;

    let pixel_length_w = range_horizontal / width;
    let pixel_length_h = range_vertical / height;
    */

    //Calculate the result for each pixel
    let mut x: f32;
    let mut y: f32;
    let mut x_squared: f32;
    let mut y_squared: f32;
    let mut iterations: u32;

    for pixel_x in 0..width {
        for pixel_y in 0..height {
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

            //Convert the number of iterations to a color value, then store it
            //Need a const to multiply the iteration num by to map it between white and black
            //..convert..
            output.push(iterations);
            //println!("({},{}) = {}", pixel_x, pixel_y, iterations);
        }
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
