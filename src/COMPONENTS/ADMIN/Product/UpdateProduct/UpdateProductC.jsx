
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
import Loading from "../../../Extra/Loading";

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
    constructor(props) {
        super(props);
        this.state={prodId: ""};
    }

    componentDidMount() {
        let prodUrl = this.props.location.pathname.split('/').pop();
        if (prodUrl) {
            this.props.getProductById(prodUrl);
        } else this.props.history.push("/admin");
        // await this.setState({prodId: this.props.location.pathname.split('/').pop()});
        // //console.log(prodId);
        //
        // this.props.setIdOfCreatedAC(null);     //  for resetting create page
        // if (this.state.prodId) {
        //     await this.props.getProductById(this.state.prodId);
        // } else {
        //     this.props.history.push("/admin");
        // }
    }

// componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevState.prodId!==this.state.prodId) {
//             this.props.getProductById(this.state.prodId);
//         }
// }

    pushToHistory = (path) => {
        this.props.history.push(path);
    }

    render() {
        if (this.props.updateProductProps.productData._id==null || this.props.updateProductProps.isLoading) return <div><Loading /></div>
        return (
            <UpdateProduct prodId={this.props.updateProductProps.productData._id} {...this.props} pushToHistory={this.pushToHistory} />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(UpdateProductC);
