import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import NotFound from "../../Extra/NotFound";
import {getListByUrl} from "../../../REDUX/reducers/listsReducer";
import {setCurrentPageAC} from "../../../REDUX/reducers/paginatorReducer";
import SectionsPane from "../SectionsPane/SectionsPane";
import PaginatorC from "../../Extra/Paginator/PaginatorC";
import Loading from "../../Extra/Loading";

class ListPageC extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUrl: this.props.match.params.listUrl,
        }
        this.onPageChanged = this.onPageChanged.bind(this);
        this.getList = this.getList.bind(this);
    }

    async getList () {
        await this.setState({listUrl: this.props.match.params.listUrl});

        if (this.state.listUrl) {
            this.props.getListByUrl(this.state.listUrl);
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

    onPageChanged(pageNumber) {     //  WHEN RETURNED FROM SEARCH PAGE
        this.props.setCurrentPageAC(pageNumber);
        this.props.getListByUrl(this.state.listUrl, pageNumber);
    }

    render() {

        if (this.props.isLoading) {
            return <div><Loading /></div>
        }
        if  (this.props.listForm===null) {
            return <NotFound />
        }
        return  <div>
            <h1>{this.props.listForm.name}</h1>

            <SectionsPane products={this.props.listForm.items}/>

            <PaginatorC onPageChanged={this.onPageChanged}   />
        </div>
        // <MainPage
        //     products={this.props.listForm.items}
        //     setCurrentPageAC={this.props.setCurrentPageAC}
        //     getProducts={this.onGetProducts}
        // />

    }
}

let mapStateToProps = (state) => {
    return ({
        isLoading: state.listsReducer.isLoading,
        listForm: state.listsReducer.listForm,
    });
}

export default compose(
    connect(mapStateToProps, {
        getListByUrl, setCurrentPageAC,
    }),
    withRouter,
)(ListPageC);