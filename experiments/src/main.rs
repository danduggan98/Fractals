mod lib;

//Test the mandelbrot method
fn main() {
    const MAX_ITERATIONS: u8 = 100;
    let result = lib::mandelbrot(1000, 1000, -1.0, -0.5, 0.0, 0.5, 32, 1.0, 0.0, 0.2); //Test value
    println!("There were {} points on the mandelbrot", check_fractal(result, MAX_ITERATIONS));
}

fn check_fractal(data: Vec<u8>, max: u8) -> u32 {
    let mut members: u32 = 0;

    //Count the number of points that fall within the set
    for pixel in data.iter() {
        if pixel < &max {
            members += 1;
        }
    }
    return members;
}