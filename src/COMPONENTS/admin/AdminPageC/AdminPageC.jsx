import React, {Component} from 'react';
import AdminPage from "./AdminPage";
import {connect} from "react-redux";
import {compose} from "redux";
import {WithAuthRedirect} from "../../../HOC/WithAuthRedirect";
import {changePW, deleteAdminAuth} from "../../../REDUX/reducers/adminReducer";
import {
    deleteProducts,
    findProducts,
    getProducts,
} from "../../../REDUX/reducers/productsReducer";
import {createList} from "../../../REDUX/reducers/typesReducer";
import {withRouter} from "react-router-dom";
import {setCurrentPageAC, setPortionNumAC} from "../../../REDUX/reducers/paginatorReducer";

let mapStateToProps = (state) => {
    return {
        lists: state.listsReducer.lists,
        products: state.productsReducer.products,
        productsFound: state.productsReducer.productsFound,
        totalProductsCount: state.productsReducer.totalProductsCount,
        portionLimit: state.productsReducer.portionLimit,
        portionNum: state.productsReducer.portionNum,
        currentPage: state.productsReducer.currentPage,
        paginatorData: state.paginatorReducer,
    }
}

class AdminPageC extends Component {
    render() {
        return (
            <AdminPage {...this.props} />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, {deleteAdminAuth, deleteProducts, createList, changePW, findProducts,
        setCurrentPageAC, setPortionNumAC, getProducts}),
)(AdminPageC);
