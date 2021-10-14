import React, {Component} from 'react';
import AdminPage from "./AdminPage";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {WithAuthRedirect} from "../../../HOC/WithAuthRedirect";
import {changePW, deleteAdminAuth} from "../../../REDUX/reducers/adminReducer";
import {
    createProduct,
    deleteProducts,
    getProductById,
    getProducts, setChosenProductAC, updateProduct,
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
import {setCurrentPageAC} from "../../../REDUX/reducers/paginatorReducer";
import {addPhotos, deletePhotos} from "../../../REDUX/reducers/photosReducer";
import {getListPageProps} from "../../../REDUX/selectors/products_selectors";

let mapStateToProps = (state) => {
    return {
        lists: state.listsReducer.lists,
        products: state.productsReducer.products,
        productsFound: state.productsReducer.productsFound,
        listPageProps: getListPageProps(state),
        chosenProduct: state.productsReducer.chosenProduct,
        itemsIdsArr: state.mainReducer.itemsIdsArr,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteAdminAuth, deleteProducts, createList, changePW,
        setCurrentPageAC, getProducts,
        getProductById, updateProduct, addElement, addPhotos, deletePhotos, setChosenProductAC,    //  update pane
        createProduct,  //  create pane
        updateList, deleteList, deleteElement, getListByUrl,   // list pane
    }, dispatch);
}
//updateList, deleteList, listUrl, listForm, deleteElement

class AdminPageC extends Component {

    pushToHistory = (path) => {
        this.props.history.push(path);
    }

    // componentDidMount() {
    //     console.log(this.props.location.pathname);
    //     setChosenItemsIdsAC([]);
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log("UPDATE", this.props.location.pathname, prevProps.location.pathname);
    //     console.log(prevProps.location.pathname!==this.props.location.pathname);
    //     if (prevProps.location.pathname!==this.props.location.pathname) setChosenItemsIdsAC([]);
    // }

    render() {
        //console.log("R AdminPaneC");
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
