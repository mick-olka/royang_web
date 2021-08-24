import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {getProductById} from "../../../REDUX/reducers/productsReducer";
import {withRouter} from "react-router-dom";

class ProductPageC extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prodId: this.props.match.params.prodId,
        }
    }

    componentDidMount() {
        this.setState({prodId: this.props.match.params.prodId});
        if (this.state.prodId && this.state.prodId.length === 24) {
            this.props.getProductById(this.state.prodId);
        } else {
            this.props.history.push("/not_found");
        }
    }

    render() {
        return (<div>
                {this.props.isLoading ? <div>Loading...</div> : <div>
                    PRODUCT {this.state.prodId}
                    <p>{this.props.productData.name}</p>
                </div>}
            </div>

        );
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
        getProductById,
    }),
    withRouter,
)(ProductPageC);