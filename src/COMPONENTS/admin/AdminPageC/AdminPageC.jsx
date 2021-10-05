import React, {Component} from 'react';
import AdminPage from "./AdminPage";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {WithAuthRedirect} from "../../../HOC/WithAuthRedirect";
import {changePW, deleteAdminAuth} from "../../../REDUX/reducers/adminReducer";
import {
    createProduct,
    deleteProducts,
    findProducts, getProductById,
    getProducts, setChosenItemsIdsAC, setChosenProductAC, setIdOfCreatedAC, updateProduct,
} from "../../../REDUX/reducers/productsReducer";
import {
    addElement,
    createList,
    deleteElement,
    deleteList,
    getListByUrl,
    updateList
} from "../../../REDUX/reducers/listsReducer";
import {withRouter} from "react-router-dom";
import {setCurrentPageAC, setPortionNumAC} from "../../../REDUX/reducers/paginatorReducer";
import {addPhotos, deletePhotos} from "../../../REDUX/reducers/photosReducer";
import {getListPageProps, getUpdateProductProps} from "../../../REDUX/selectors/products_selectors";

let mapStateToProps = (state) => {
    return {
        lists: state.listsReducer.lists,
        products: state.productsReducer.products,
        productsFound: state.productsReducer.productsFound,
        paginatorData: state.paginatorReducer,
        updateProductProps: getUpdateProductProps(state),
        idOfCreated: state.productsReducer.idOfCreated,
        listPageProps: getListPageProps(state),
        chosenProduct: state.productsReducer.chosenProduct,
        chosenItemsIds: state.productsReducer.chosenItemsIds,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteAdminAuth, deleteProducts, createList, changePW, findProducts,
        setCurrentPageAC, setPortionNumAC, getProducts,
        getProductById, updateProduct, addElement, addPhotos, deletePhotos, setIdOfCreatedAC, setChosenProductAC,    //  update pane
        createProduct,  //  create pane
        updateList, deleteList, deleteElement, getListByUrl,   // list pane
        setChosenItemsIdsAC,
    }, dispatch);
}
//updateList, deleteList, listUrl, listForm, deleteElement

class AdminPageC extends Component {

    pushToHistory = (path) => {
        this.props.history.push(path);
    }

    componentDidMount() {
        setChosenItemsIdsAC([]);
    }

    render() {
        console.log("R AdminPaneC");
        return (
            <AdminPage {...this.props} pushToHistory={this.pushToHistory} />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(AdminPageC);
