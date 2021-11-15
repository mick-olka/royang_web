import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {getProductById} from "../../../REDUX/reducers/productsReducer";
import {withRouter} from "react-router-dom";
import ProductPage from "./ProductPage";
import {addItemToCart} from "../../../REDUX/reducers/cartReducer";
import NotFound from "../../Extra/NotFound";
import Loading from "../../Extra/Loading";

class ProductPageC extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prodId: this.props.match.params.prodId,
        }
    }

    componentDidMount() {
        this.setState({prodId: this.props.match.params.prodId});
        if (this.state.prodId && this.state.prodId.length === 24) { //  if id legit
            this.props.getProductById(this.state.prodId);
        } else {
            this.props.history.push("/not_found");
        }
    }

    render() {
        if (this.props.isLoading) {
            return <div><Loading /></div>
        }
        if  (this.props.productData._id===null) {
            return <NotFound />
        }
        return  <ProductPage
            {...this.props}
            prodId = {this.state.prodId}
            productData={this.props.productData}
            addItemToCart={this.props.addItemToCart}
        />

    }
}

let mapStateToProps = (state) => {
    return ({
        isLoading: state.productsReducer.isLoading,
        productData: state.productsReducer.productData,
    });
}

export default compose(
    connect(mapStateToProps, {
        getProductById, addItemToCart,
    }),
    withRouter,
)(ProductPageC);