import React from 'react';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TypePane from "./TypePane";
import {deleteElement, deleteList, getListByUrl, updateList} from "../../../REDUX/reducers/typesReducer";

class TypePaneC extends React.Component {

    getList = () => {
        this.listUrl = this.props.match.params.listUrl;
        if (this.listUrl) {
            this.props.getListByUrl(this.listUrl);
        }
    }

    componentDidMount() {
        this.getList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.listUrl!==prevProps.match.params.listUrl) {
            this.getList();
        }
    }

    render() {

        return (
            <div>
                {this.props.isLoading ? <div>Loading...</div>
                    : <TypePane {...this.props} listUrl={this.listUrl} />}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        listForm: state.listsReducer.listForm,
        isLoading: state.listsReducer.isLoading,
    });
}

export default compose(
    connect(mapStateToProps, {
        updateList, getListByUrl, deleteList, deleteElement,
    }),
    withRouter,
)(TypePaneC);