//import React, {Component} from 'react';
import AdminAuth from "./AdminAuth";
import {authAdmin} from "../../../REDUX/reducers/adminReducer";
import {connect} from "react-redux";

// class AdminAuthC extends Component {
//
//     componentDidMount() {
//
//     }
//
//     render() {
//         return <AuthAdmin {...this.props} />;
//     }
// }

const mapStateToProps = (state) => ({
    isAdmin: state.admin.isAdmin,
});

export default connect(mapStateToProps, {authAdmin})(AdminAuth);