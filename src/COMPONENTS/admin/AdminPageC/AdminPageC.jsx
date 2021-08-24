//import React from "react";
import AdminPage from "./AdminPage";
import {connect} from "react-redux";
import {compose} from "redux";
import {WithAuthRedirect} from "../../../HOC/WithAuthRedirect";
import {changePW, deleteAdminAuth} from "../../../REDUX/reducers/adminReducer";
import {deleteProducts} from "../../../REDUX/reducers/productsReducer";
import {createList} from "../../../REDUX/reducers/typesReducer";

let mapStateToProps = (state) => {
    return {
        products: state.productsReducer.products,
        lists: state.listsReducer.lists,
    }
}

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps, {deleteAdminAuth, deleteProducts, createList, changePW}),
)(AdminPage);
