import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createSlide, deleteSlide, getSlides} from "../../../REDUX/reducers/sliderReducer";
import ItemsListC from "../ItemsList/ItemsListC";
import CreateSlideForm from "./CreateSlideForm";


class SliderEditPageC extends Component {

    constructor(props) {
        super(props);

        this.state = {
            img: null,
        }

        this.onSlideDelete = this.onSlideDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onImgSelected = this.onImgSelected.bind(this);
    }

    componentDidMount() {
        this.props.getSlides();
    }

    onSubmit(formData) {
        this.props.createSlide({...formData, img: this.state.img});
        // console.log(formData);
        // console.log(this.state.img);
        this.props.getSlides();
    }

    onSlideDelete(idsArr) {
        for (let i=0; i<idsArr.length; i++) {
            this.props.deleteSlide(idsArr[i]);
        }
        this.props.getSlides();
    }

    onImgSelected(e) {
        if (e.target.files.length) {
            let img = e.target.files[0];
            this.setState({img: img});
        }
    }

    render() {

        return (
            <div>

                <ItemsListC items={this.props.slides} deleteItems={this.onSlideDelete} >
                    {(item)=>(<div style={{display: "flex", justifyContent: "space-around"}} >
                        <p>{item.text}</p>
                        <img src={item.img} alt="slide" style={{width: "3rem"}} />
                    </div>)}
                </ItemsListC>

                <input type="file" disabled={false} onChange={this.onImgSelected} />
                <CreateSlideForm onSubmit={this.onSubmit} />

            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        slides: state.sliderReducer.slides,
    });
}

export default compose(
    connect(mapStateToProps, {
       getSlides, createSlide, deleteSlide,
    }),
    withRouter,
)(SliderEditPageC);