
import React, {Component} from 'react';
import {bindActionCreators, compose} from "redux";
import {WithAuthRedirect} from "../../../../HOC/WithAuthRedirect";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createProduct} from "../../../../REDUX/reducers/productsReducer";
import CreateProduct from "./CreateProduct";

let mapStateToProps = (state) => {
    return {
        // idOfCreated: state.productsReducer.idOfCreated
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createProduct,
    }, dispatch);
}

class CreateProductC extends Component {

    pushToHistory = (path) => {
        this.props.history.push(path);
    }

    render() {
        return (
            <CreateProduct createProduct={this.props.createProduct} pushToHistory={this.pushToHistory} />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(CreateProductC);
