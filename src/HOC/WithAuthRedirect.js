import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export const WithAuthRedirect = (Component) => {

    let mapStateToPropsForRedirect = (state) => ({
        isAdmin: state.admin.isAdmin
    });

    class RedirectComponent extends React.Component {

        render() {
            if (!this.props.isAdmin) return <Redirect to='/admin/auth' />
            return <Component {...this.props} />
        }
    }


    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}