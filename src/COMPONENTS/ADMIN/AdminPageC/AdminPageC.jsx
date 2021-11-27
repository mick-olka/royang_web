import React, {Component} from 'react';
import AdminPage from "./AdminPage";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {WithAuthRedirect} from "../../../HOC/WithAuthRedirect";
import {changePW, deleteAdminAuth} from "../../../REDUX/reducers/adminReducer";
import {
    createList,
} from "../../../REDUX/reducers/listsReducer";
import {withRouter} from "react-router-dom";

let mapStateToProps = (state) => {
    return {
        lists: state.listsReducer.lists,
        products: state.productsReducer.products,
        productsFound: state.productsReducer.productsFound,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteAdminAuth, createList, changePW,
    }, dispatch);
}

class AdminPageC extends Component {

    pushToHistory = (path) => {
        this.props.history.push(path);
    }

    render() {
        return (
            <AdminPage {...this.props} pushToHistory={this.pushToHistory} />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(AdminPageC);
