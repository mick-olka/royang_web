// import React from 'react';
import {compose} from "redux";
import { connect } from "react-redux";
import MainPage from "./MainPage";
import {getProducts, setCurrentPageAC, setPortionNumAC} from "../../../REDUX/reducers/productsReducer";

let mapStateToProps = (state) => {
    return{
        products: state.productsReducer.products,
        productsFound: state.productsReducer.productsFound,
        totalProductsCount: state.productsReducer.totalProductsCount,
        portionLimit: state.productsReducer.portionLimit,
        portionNum: state.productsReducer.portionNum,
        currentPage: state.productsReducer.currentPage,
        paginatorData: state.productsReducer.paginatorData,
    }
}

export default compose(
    connect(mapStateToProps, {setCurrentPageAC, setPortionNumAC, getProducts}),
)(MainPage);