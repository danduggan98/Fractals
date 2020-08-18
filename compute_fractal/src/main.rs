fn main() {
    compute_fractal(2/*56*/, 2/*56*/);
}

fn compute_fractal(w: i32, h: i32) {
    println!("Computing fractal with width {} and height {}", w, h);

    for pixel_x in 0..w {
        for pixel_y in 0..h {
            println!("Computing pixel at ({}, {})", pixel_x, pixel_y);
        }
    }
}
