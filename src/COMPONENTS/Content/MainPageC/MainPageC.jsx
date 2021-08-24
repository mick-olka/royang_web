// import React from 'react';
import {compose} from "redux";
import { connect } from "react-redux";
import MainPage from "./MainPage";

let mapStateToProps = (state) => {
    return{
        products: state.productsReducer.products,
    }
}

export default compose(
    connect(mapStateToProps, {}),
)(MainPage);