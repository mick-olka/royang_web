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
import {createList} from "../../../REDUX/reducers/listsReducer";
import {withRouter} from "react-router-dom";
import {setCurrentPageAC, setPortionNumAC} from "../../../REDUX/reducers/paginatorReducer";

let mapStateToProps = (state) => {
    return {
        lists: state.listsReducer.lists,
        products: state.productsReducer.products,
        productsFound: state.productsReducer.productsFound,
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
