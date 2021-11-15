import React from 'react';
import s from "./InfoPage.module.css";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {getGallery} from "../../../REDUX/reducers/photosReducer";

let mapStateToProps = (state) => {
    return {
        gallery: state.photosReducer.gallery,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGallery,
    }, dispatch);
}

class PhotoGalleryC extends React.Component {

    componentDidMount() {
        if (this.props.gallery.length<1) this.props.getGallery();
    }

    render() {
        return (
            <div className={s.gallery_div} >
                <h2 style={{fontSize: "1.5rem"}} >Галерея Фото</h2>

                {this.props.gallery.map(p=>{
                    return <img className={s.gallery_img} key={p} src={p} alt={p} />
                })}

            </div>
        );
    }
}

// export default PhotoGalleryC;

export default compose(
    // withRouter,
    // WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(PhotoGalleryC);