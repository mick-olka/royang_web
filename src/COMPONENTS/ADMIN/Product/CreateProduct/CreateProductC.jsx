
import React, {Component} from 'react';
import {bindActionCreators, compose} from "redux";
import {WithAuthRedirect} from "../../../../HOC/WithAuthRedirect";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createProduct} from "../../../../REDUX/reducers/productsReducer";
import CreateProduct from "./CreateProduct";

let mapStateToProps = (state) => {
    return {
        idOfCreated: state.productsReducer.idOfCreated
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createProduct,
    }, dispatch);
}

class CreateProductC extends Component {

// componentDidMount() {
//     let prodId = this.props.location.pathname.split('/').pop();
//     //console.log(prodId);
//
//     this.props.setIdOfCreatedAC(null);     //  for resetting create page
//     if (prodId && prodId.length===24) {
//         this.props.getProductById(prodId);
//     } else {
//         this.props.pushToHistory("/ADMIN");
//     }
// }

    pushToHistory = (path) => {
        this.props.history.push(path);
    }

    render() {
        return (
            <CreateProduct createProduct={this.props.createProduct} idOfCreated={this.props.idOfCreated} pushToHistory={this.pushToHistory} />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(CreateProductC);
