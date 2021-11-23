import React, { Component } from "react";
import Slider from "react-slick";
import "./MainSlider.css";
import s from "./Slider.module.css";
import {compose} from "redux";
import {connect} from "react-redux";

class MainSlider extends Component {

    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.state = {
            width:  800,
            height: 190,
            slidesToShow: 2,
        }
    }

    /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
        if(window.innerWidth < 1200) {
            this.setState({ width: 450, height: 150, slidesToShow: 2 });
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
        const preload = {
            text: "loading",
            lower_text: "loading",
            nav_link: "loading",
        }
        let arr=[];
        if (this.props.slides.length<1) {arr.push({...preload, _id: 0}, {...preload, _id: 1}, {...preload, _id: 2})}
        else arr = [...this.props.slides];
        if (arr.length<3) {arr.push(arr[0], arr[0])}
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: this.state.slidesToShow,
            slidesToScroll: 1,
            autoplay: true,
        };

        return (
            <div className={s.mainSlider} >
                {/*<h2>width:  {this.state.width}</h2>*/}
                <Slider {...settings} >

                    {arr.map(i=>{
                        return <div key={i._id} className={s.mainSlider__item} >
                            <a
                                target="_blank" rel="noopener noreferrer"
                                href={i.nav_link} >
                            <img src={i.img} alt="slide_img" className={s.m_slide_img} />
                            <div className={s.text_div} >
                                <h3>{i.text}</h3>
                                <p>{i.lower_text}</p>
                            </div>
                            </a>
                        </div>
                    })}
                </Slider>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        slides: state.sliderReducer.slides,
    });
}

// export default MainSlider;
export default compose(
    connect(mapStateToProps, {}),
)(MainSlider);