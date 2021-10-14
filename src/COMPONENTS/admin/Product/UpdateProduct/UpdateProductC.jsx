
import React, {Component} from 'react';
import {bindActionCreators, compose} from "redux";
import UpdateProduct from "./UpdateProduct";
import {WithAuthRedirect} from "../../../../HOC/WithAuthRedirect";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getUpdateProductProps} from "../../../../REDUX/selectors/products_selectors";
import {
    getProductById,
    setChosenProductAC,
    setIdOfCreatedAC,
    updateProduct
} from "../../../../REDUX/reducers/productsReducer";
import {addElement} from "../../../../REDUX/reducers/listsReducer";
import {addPhotos, deletePhotos} from "../../../../REDUX/reducers/photosReducer";

let mapStateToProps = (state) => {
    return {
        updateProductProps: getUpdateProductProps(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProductById, updateProduct, addElement, addPhotos, deletePhotos, setIdOfCreatedAC, setChosenProductAC
    }, dispatch);
}

class UpdateProductC extends Component {
    prodId=null;
componentDidMount() {

    this.prodId = this.props.location.pathname.split('/').pop();
    //console.log(prodId);

    this.props.setIdOfCreatedAC(null);     //  for resetting create page
    if (this.prodId && this.prodId.length===24) {
        this.props.getProductById(this.prodId);
    } else {
        this.props.pushToHistory("/admin");
    }
}

    pushToHistory = (path) => {
        this.props.history.push(path);
    }

    render() {
        //console.log("R AdminPaneC");
        if (this.props.updateProductProps.productData._id==null) return <div>Loading...</div>
        return (
            <UpdateProduct prodId={this.prodId} {...this.props} pushToHistory={this.pushToHistory} />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(UpdateProductC);
