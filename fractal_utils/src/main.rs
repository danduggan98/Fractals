mod lib;

//Test the mandelbrot method
fn main() {
    const MAX_ITERATIONS: u32 = 100;
    let result = lib::mandelbrot(200, 150, 0.0, 0.0, MAX_ITERATIONS); //Test value
    println!("There were {} points on the mandelbrot", check_fractal(result, MAX_ITERATIONS));
}

fn check_fractal(data: Vec<u32>, max: u32) -> u32 {
    let mut members: u32 = 0;

    //Count the number of points that fall within the set
    for pixel in data.iter() {
        if pixel < &max {
            members += 1;
        }
    }
    return members;
}
