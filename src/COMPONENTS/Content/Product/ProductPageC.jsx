import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {getProductById} from "../../../REDUX/reducers/productsReducer";
import {withRouter} from "react-router-dom";
import ProductPage from "./ProductPage";
import {addItemToCart} from "../../../REDUX/reducers/cartReducer";

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
        if (this.props.isLoading || this.props.productData._id===null) {
            return <div>Loading...</div>
        } else return  <ProductPage
            prodId = {this.state.prodId}
            productData={this.props.productData}
            addItemToCart={this.props.addItemToCart}
        />
        // return (<div>
        //         {this.props.isLoading ? <div>Loading...</div> :  <ProductPage
        //                 prodId = {this.state.prodId}
        //                 productData={this.props.productData}
        //             />}
        //     </div>
        // );
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