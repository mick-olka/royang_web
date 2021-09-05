import React, {Component} from 'react';
import AdminPage from "./AdminPage";
import {connect} from "react-redux";
import {compose} from "redux";
import {WithAuthRedirect} from "../../../HOC/WithAuthRedirect";
import {changePW, deleteAdminAuth} from "../../../REDUX/reducers/adminReducer";
import {deleteProducts, findProducts} from "../../../REDUX/reducers/productsReducer";
import {createList} from "../../../REDUX/reducers/typesReducer";
import {withRouter} from "react-router-dom";

let mapStateToProps = (state) => {
    return {
        products: state.productsReducer.products,
        productsFound: state.productsReducer.productsFound,
        lists: state.listsReducer.lists,
    }
}

class AdminPageC extends Component {
    render() {
        return (
            <AdminPage
                {...this.props}
            />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, {deleteAdminAuth, deleteProducts, createList, changePW, findProducts}),
)(AdminPageC);
