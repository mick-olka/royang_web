import React from 'react';
import ListsSelect from "../ListSelect/ListsSelect";
import PaginatorC from "../../extra/Paginator/PaginatorC";
import {bindActionCreators, compose} from "redux";
import {getProducts} from "../../../REDUX/reducers/productsReducer";
import {setCurrentPageAC, setPortionNumAC} from "../../../REDUX/reducers/paginatorReducer";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addElement} from "../../../REDUX/reducers/listsReducer";

let mapStateToProps = (state) => {
    return {
        itemsIdsArr: state.mainReducer.itemsIdsArr,
        lists: state.listsReducer.lists,
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addElement, setCurrentPageAC, getProducts, setPortionNumAC,
    }, dispatch);
}

class MainAdminPageC extends React.Component {

    constructor(props) {
        super(props);
        this.onPageChanged = this.onPageChanged.bind(this);

    }

    componentDidMount() {
        this.props.getProducts(1);
        this.props.setCurrentPageAC(1);
        this.props.setPortionNumAC(1);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPageAC(pageNumber);
        this.props.getProducts(pageNumber);
    }

    render() {
        return (
            <div>
                {this.props.itemsIdsArr.length>0 && <ListsSelect lists={this.props.lists} addElement={this.props.addElement} prodIdArr={this.props.itemsIdsArr} />}
                {this.props.children}
                <PaginatorC onPageChanged={this.onPageChanged} />
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(MainAdminPageC);
