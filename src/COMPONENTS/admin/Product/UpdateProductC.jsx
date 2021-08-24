import React from 'react';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    getProductById, updateProduct,
} from "../../../REDUX/reducers/productsReducer";
import {addElement} from "../../../REDUX/reducers/typesReducer";
import UpdateProduct from "./UpdateProduct";
import {addPhoto, deletePhotos} from "../../../REDUX/reducers/photosReducer";

class UpdateProductC extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            prodId: this.props.match.params.prodId,
        }
    }

    componentDidMount() {
        this.setState({prodId: this.props.match.params.prodId});
        if (this.state.prodId && this.state.prodId.length===24) {
            this.props.getProductById(this.state.prodId);
        } else {
            this.props.history.push("/not_found");
        }
    }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.prodId = this.props.match.params.prodId;
    //     if (this.prodId !== prevProps.match.params.prodId) {
    //         if (this.prodId !== undefined)
    //             this.props.getProductById(this.prodId);
    //     }
    // }

    render() {

        return (
            <div>
                {this.props.isLoading ? <div>Loading...</div> : <UpdateProduct {...this.props} prodId={this.state.prodId}/>}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        productData: state.productsReducer.productData,
        isLoading: state.productsReducer.isLoading,
        lists: state.listsReducer.lists,
        newError: state.productsReducer.newError,
    });
}

export default compose(
    connect(mapStateToProps, {
        updateProduct, getProductById, addElement, addPhoto, deletePhotos,
    }),
    withRouter,
)(UpdateProductC);