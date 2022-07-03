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
        currency_value: state.textReducer.text_blocks.find(i=>i.name==="currency_value")
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateProduct, deleteProducts, setChosenProductAC,
    }, dispatch);
}

class AdminProductsPaneC extends React.Component {

    updateSimilarOrRelated = (data) => {
        this.props.updateProduct(this.props.chosenProduct._id, data);
        this.props.setChosenProductAC(null);
        this.props.history.push("/admin/products/" + this.props.chosenProduct.url_name);
    }

    onSetAsSimilar = () => {
        let prevSimilarProds = this.props.chosenProduct.similarProducts.map(p=>{
            return p._id;
        });
        let newSimilarProds = {similarProducts: [...prevSimilarProds, ...this.props.itemsIdsArr]}
        this.updateSimilarOrRelated(newSimilarProds);
    }

    onSetAsRelated = () => {
        let prevRelatedProds = this.props.chosenProduct.relatedProducts.map(p=>{
            return p._id;
        });
        let newRelatedProds = {relatedProducts: [...prevRelatedProds, ...this.props.itemsIdsArr]}
        this.updateSimilarOrRelated(newRelatedProds);
    }

    render() {

        return <div>
            {this.props.chosenProduct ? <div><h3>Choose related to {this.props.chosenProduct.name.ua}</h3>
                <button onClick={this.onSetAsRelated}>Set as related</button>
                <button onClick={this.onSetAsSimilar}>Set as similar</button>
            </div> : null}
            <ItemsListC items={this.props.products} deleteItems={this.props.deleteProducts} pushToHistory={this.props.pushToHistory} >
                {item => <ProductItem item={item} currency_value={this.props.currency_value} updateProduct={this.props.updateProduct} />}
            </ItemsListC>
        </div>;
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(AdminProductsPaneC);