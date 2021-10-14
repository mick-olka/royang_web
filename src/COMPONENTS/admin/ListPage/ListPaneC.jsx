import React from 'react';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ListPane from "./ListPane";
import {deleteElement, deleteList, getListByUrl, updateList} from "../../../REDUX/reducers/listsReducer";
import {setCurrentPageAC, setPortionNumAC} from "../../../REDUX/reducers/paginatorReducer";

class ListPaneC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listUrl: this.props.match.params.listUrl,
        }
        this.getList = this.getList.bind(this);
    }

    getList = async () => {
        await this.setState({listUrl: this.props.match.params.listUrl});
        if (this.state.listUrl) {
            this.props.getListByUrl(this.state.listUrl);
        }
    }

    componentDidMount() {
        this.getList();
        this.props.setPortionNumAC(1);
        this.props.setCurrentPageAC(1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.listUrl!==prevProps.match.params.listUrl) {
            this.getList();
        }
    }

    render() {

        if (this.props.isLoading) {return <div>Loading...</div>}

        return (
            <ListPane {...this.props} listUrl={this.state.listUrl} />
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
        updateList, getListByUrl, deleteList, deleteElement, setCurrentPageAC, setPortionNumAC,
    }),
    withRouter,
)(ListPaneC);