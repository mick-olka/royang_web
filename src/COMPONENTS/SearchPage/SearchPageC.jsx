
import React, {Component} from 'react';
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SearchWrapper from "./SearchWrapper";
import {findProducts} from "../../REDUX/reducers/productsReducer";
import {setCurrentPageAC, setPortionNumAC} from "../../REDUX/reducers/paginatorReducer";

let mapStateToProps = (state) => {
    return {
        productsFound: state.productsReducer.productsFound,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        findProducts, setPortionNumAC, setCurrentPageAC,
    }, dispatch);
}

class PaginatorC extends Component {

    render() {
        return (
            <SearchWrapper
                products={this.props.productsFound}
                findProducts={this.props.findProducts}
                setPortionNumAC={this.props.setPortionNumAC}
                setCurrentPage={this.props.setCurrentPageAC}
            >
                {this.props.children}
            </SearchWrapper>
        );
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(PaginatorC);
