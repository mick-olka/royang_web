import React, { Component } from "react";
import Slider from "react-slick";
import s from "./Slider.module.css";

export default class SlickSlider extends Component {

    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.state = {
            width:  800,
            height: 182,
            slidesToShow: 3,
        }
    }

    /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
        if(window.innerWidth < 900) {
            this.setState({ width: 450, height: 102, slidesToShow: 2 });
        } else {
            let update_width  = window.innerWidth-100;
            let update_height = Math.round(update_width/4.4);
            this.setState({ width: update_width, height: update_height, slidesToShow: 3  });
        }
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        const arr = [1, 2, 3, 4, 5, 6];
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: this.state.slidesToShow,
            slidesToScroll: 1
        };
        return (
            <div className={s.slickSlider} >
                <h2>width:  {this.state.width}</h2>
                <Slider {...settings}>
                    {/*<div>*/}
                    {/*    <h3>1</h3>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h3>2</h3>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h3>3</h3>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h3>4</h3>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h3>5</h3>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h3>6</h3>*/}
                    {/*</div>*/}
                    {arr.map(i=>{
                        return <div key={i} className={s.slickSlider__item} >
                            <h3>{i}</h3>
                        </div>
                    })}
                </Slider>
            </div>
        );
    }
}