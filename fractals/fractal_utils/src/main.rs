mod lib;

//Test the mandelbrot method
fn main() {
    const MAX_ITERATIONS: u32 = 100;
    let arr = vec![0,0,0, 0,0,255, 255,255,255, 255,255,0, 255,255,255];

    //Measure performance
    use std::time::Instant;
    let now = Instant::now();
    let _result = lib::mandelbrot(1000, 1000, -2.0, 0.5, -1.2, 1.2, MAX_ITERATIONS, arr);
    let elapsed = now.elapsed();

    println!("Mandelbrot function completed successfully!");
    println!("- Iterations: {}", MAX_ITERATIONS);
    println!("- Time elapsed: {} ms", elapsed.as_millis());
}
