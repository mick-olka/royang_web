import React from 'react';
import Carousel from "react-gallery-carousel";
import 'react-gallery-carousel/dist/index.css';
import s from "./Slider.module.css";
// kuku
function Slider(props) {
    const images = [[900, 200], [200, 200], [500, 200], [500, 300]].map((size) => ({
        src: `https://placedog.net/${size[0]}/${size[1]}`,
        alt: "Loading..."
    }));
    return (
        <div>
            SLIDER
            <Carousel images={images} className={s.carousel} objectFit={"contain"} playIcon={false} />
        </div>
    );
}

export default Slider;