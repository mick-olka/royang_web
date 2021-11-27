
import React, {Component} from 'react';
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../../HOC/WithAuthRedirect";
import OrdersPage from "./OrdersPage";
import {deleteOrders, getOrders} from "../../../REDUX/reducers/cartReducer";
import {setCurrentPageAC} from "../../../REDUX/reducers/paginatorReducer";

let mapStateToProps = (state) => {
    return {
        orders: state.cartReducer.orders,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getOrders, deleteOrders, setCurrentPageAC
    }, dispatch);
}

class OrdersC extends Component {

componentDidMount() {
    this.props.getOrders(1, 2);
}

    render() {
        return (
            <OrdersPage {...this.props} />
        );
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(OrdersC);
