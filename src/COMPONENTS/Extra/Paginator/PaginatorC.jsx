
import React, {Component} from 'react';
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setPortionNumAC} from "../../../REDUX/reducers/paginatorReducer";
import Paginator from "./Paginator";

let mapStateToProps = (state) => {
    return {
        paginatorData: state.paginatorReducer,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setPortionNumAC
    }, dispatch);
}

class PaginatorC extends Component {

    render() {
        return (
            <Paginator
                paginatorData={this.props.paginatorData}
                setPortionNum={this.props.setPortionNumAC}
                onPageChanged={this.props.onPageChanged}
            />
        );
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(PaginatorC);
