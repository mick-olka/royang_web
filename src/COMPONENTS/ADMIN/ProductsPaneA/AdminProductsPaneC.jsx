import ItemsListC from "../ItemsList/ItemsListC";
import ProductItem from "../Product/ProductItem";
import React from "react";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {
    deleteProducts,
    setChosenProductAC,
    updateProduct
} from "../../../REDUX/reducers/productsReducer";

const mapStateToProps = (state) => {
    return {
        chosenProduct: state.productsReducer.chosenProduct,
        itemsIdsArr: state.mainReducer.itemsIdsArr,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateProduct, deleteProducts, setChosenProductAC,
    }, dispatch);
}

class AdminProductsPaneC extends React.Component {

    updateSimilarOrRelated = (data) => {
        updateProduct(this.props.chosenProduct._id, data);
        setChosenProductAC(null);
        this.props.history.push("/admin/products/" + this.props.chosenProduct.url_name);
    }

    onSetAsSimilar = () => {
        let newSimilarProds = {similarProducts: [...this.props.chosenProduct.similarProducts, ...this.props.itemsIdsArr]}
        this.updateSimilarOrRelated(newSimilarProds);
    }

    onSetAsRelated = () => {
        let newRelatedProds = {relatedProducts: [...this.props.chosenProduct.relatedProducts, ...this.props.itemsIdsArr]}
        this.updateSimilarOrRelated(newRelatedProds);
    }

    render() {

        return <div>
            {this.props.chosenProduct ? <div><h3>Choose related to {this.props.chosenProduct.name}</h3>
                <button onClick={this.onSetAsRelated}>Set as related</button>
                <button onClick={this.onSetAsSimilar}>Set as similar</button>
            </div> : null}
            <ItemsListC items={this.props.products} deleteItems={deleteProducts}>
                {item => <ProductItem item={item}/>}
            </ItemsListC>
        </div>;
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(AdminProductsPaneC);