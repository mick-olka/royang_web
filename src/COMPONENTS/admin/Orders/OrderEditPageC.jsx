import React, {Component} from 'react';
import OrderEditPage from "./OrderEditPage";
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../../HOC/WithAuthRedirect";
import {connect} from "react-redux";
import {getOrderById, updateOrder} from "../../../REDUX/reducers/cartReducer";

let mapStateToProps = (state) => {
    return {
        orderData: state.cartReducer.orderData,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getOrderById, updateOrder,
    }, dispatch);
}

class OrderEditPageC extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderId: this.props.match.params.orderId,
        }
    }

    componentDidMount() {
        this.setState({orderId: this.props.match.params.orderId});
        if (this.state.orderId && this.state.orderId.length === 24) { //  if id legit
            this.props.getOrderById(this.state.orderId);
        } else {
            this.props.history.push("/not_found");
        }
    }

    render() {
        if (!this.props.orderData._id) return <div>Loading...</div>;
        return <OrderEditPage orderId={this.state.orderId} {...this.props} />;
    }
}

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(OrderEditPageC);
