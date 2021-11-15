
import React, {Component} from 'react';
import {bindActionCreators, compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ItemsList from "./ItemsList";
import {setItemsIdsArrAC} from "../../../REDUX/reducers/mainReducer";

let mapStateToProps = (state) => {
    return {
        itemsIdsArr: state.mainReducer.itemsIdsArr,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setItemsIdsArrAC
    }, dispatch);
}

class ItemsListC extends Component {

    render() {
        //  items   deleteItems
        return (
            <ItemsList setItemsIdArr={this.props.setItemsIdsArrAC} {...this.props} />
        );
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(ItemsListC);
