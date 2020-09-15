import Head from 'next/head';
import Controller from '../components/controller';
import styles from '../styles/index.module.css';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Fractals.io - Mandelbrot</title>
            </Head>
            <div id={styles.content}>
                <div id={styles.controller}>
                    <Controller />
                </div>
                <div id={styles.help}>

                    <div id={styles.instructions}>
                        <input id='instructionsCollapsible' className={styles.collapsible + ' ' + styles.toggle} type='checkbox'></input>
                        <label htmlFor='instructionsCollapsible' className={styles.toggleLabel + ' ' + styles.instructionsHeader}>Instructions</label>
                        <div className={styles.collapsibleContent}>
                            <ul type='disc'>
                                <li>Left-click anywhere on the image to zoom in to that point, or right-click to zoom out from that point.</li>
                                    <ul type='square'><li>The amount you zoom depends on the zoom speed, which can be adjusted with the slider on the right.</li></ul>
                                <li>You can adjust image quality by changing the number of iterations with the slider on the right. More iterations = more detail.</li>
                                <li>Change the color scheme by choosing a preset or by hovering over each colored box and then selecting a new color from the menu that appears.</li>
                                    <ul type='square'>
                                        <li>Every color scheme is made of three colors:</li>
                                            <ul type='circle'><li>Primary - this is the main color that will take up most of the image</li></ul>
                                            <ul type='circle'><li>Secondary - this will color most edges and corners</li></ul>
                                            <ul type='circle'><li>Tertiary - this will color most inner details</li></ul>
                                    </ul>
                                <li>Select the 'Reset' button on a property to return it to its default value. The 'Start Over' button resets everything.</li>
                                <li>Your current coordinates are listed underneath the image, and you can press the 'Reset View' button to zoom all the way out.</li>
                            </ul>
                        </div>
                    </div>

                    <div id={styles.QA}>
                        <input id='QACollapsible' className={styles.collapsible + ' ' + styles.toggle} type='checkbox'></input>
                        <label htmlFor='QACollapsible' className={styles.toggleLabel + ' ' + styles.QAHeader}>QA</label>
                        <div className={styles.collapsibleContent}>
                            <ul type='disc'>
                                <li>Q: Why is the image blurry?</li>
                                    <ul type='square'><li>A: You may need to increase the number of iterations. 
                                        The farther you zoom, the more iterations are needed for a clear image.</li>
                                    </ul>
                                <li>Q: Why is it suddenly taking much longer to zoom?</li>
                                    <ul type='square'><li>A: If you have significantly increased the number of iterations, it will take longer 
                                        for the image to calculate. You will also experience longer loads in areas with large black regions.</li>
                                    </ul>
                                <li>Q: What exactly is the Mandelbrot set?</li>
                                    <ul type='square'>
                                        <li>A: Everything you see is generated from a very simple mathematical formula. 
                                            We plug the coordinates of each pixel into this formula and then assign it a 
                                            color based on how quickly the value grows. You can read all about it&nbsp;
                                            <a target='_blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Mandelbrot_set'>here</a>.
                                        </li>
                                    </ul>
                                <li>Q: Are you going to add more fractals in the future?</li>
                                    <ul type='square'><li>A: Yes! We plan to add the Julia Set, Pythagorean trees, and a few others. 
                                        This is just a fun side project for us, so it may be a while before these features are added. 
                                        Check back regularly for updates and improvements.</li>
                                    </ul>
                                <li>Q: How did you build this?</li>
                                    <ul type='square'><li>A: Rust, Webassembly, and React. If that means anything to you, check out our Github page for the open-source&nbsp;
                                        <a target='_blank' rel='noopener noreferrer' href='https://github.com/danduggan98/Fractals'>code</a>,
                                        and feel free to contribute anything you want!</li>
                                    </ul>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
