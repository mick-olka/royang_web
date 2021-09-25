// import React from 'react';
import {compose} from "redux";
import { connect } from "react-redux";
import MainPage from "./MainPage";
import {findProducts, getProducts} from "../../../REDUX/reducers/productsReducer";
import {setCurrentPageAC, setPortionNumAC} from "../../../REDUX/reducers/paginatorReducer";

let mapStateToProps = (state) => {
    return{
        products: state.productsReducer.products,
        productsFound: state.productsReducer.productsFound,
        paginatorData: state.paginatorReducer,
    }
}

export default compose(
    connect(mapStateToProps, {setCurrentPageAC, setPortionNumAC, getProducts, findProducts}),
)(MainPage);