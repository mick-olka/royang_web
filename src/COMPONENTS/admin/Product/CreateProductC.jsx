import React from 'react';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    createProduct,
} from "../../../REDUX/reducers/productsReducer";
import CreateProduct from "./CreateProduct";

class CreateProductC extends React.Component {

    componentDidMount() {
        // this.prodId = this.props.match.params.prodId;
        // if (this.prodId) {
        //     this.props.getProductById(this.prodId);
        // }

    }

    render() {

        return (
            <div>
                    <CreateProduct {...this.props} createProduct={this.props.createProduct}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        lists: state.listsReducer.lists,
        idOfCreated: state.productsReducer.idOfCreated,
    });
}

export default compose(
    connect(mapStateToProps, {
        createProduct,
    }),
    withRouter,
)(CreateProductC);