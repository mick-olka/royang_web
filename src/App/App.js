import React from "react";
import './App.css';
import {Component} from "react";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store from "../REDUX/reduxStore";
import {initApp} from "../REDUX/reducers/mainReducer";
import Content from "../COMPONENTS/Content/Content";
import AdminPageC from "../COMPONENTS/admin/AdminPageC/AdminPageC";
import {Switch} from "react-router-dom";
import AdminAuthC from "../COMPONENTS/admin/AuthAdmin/AdminAuthC";
import {findProducts, getProducts} from "../REDUX/reducers/productsReducer";
import {setCurrentPageAC, setPortionNumAC} from "../REDUX/reducers/paginatorReducer";
import {createOrder, deleteItemByIndex} from "../REDUX/reducers/cartReducer";

class App extends Component {

    catchAllUnhandledErrors = (reason, promise) => {
        alert("Error: "+reason);
    }

    componentDidMount() {
        //  for uncaught errors
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
        this.props.initApp(this.props.paginatorData.currentPage, this.props.paginatorData.pageLimit);   //  has promise in reducer, takes time to set
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) return <div className="App">Loading...</div>
        return (
            <div className="App">
                <Switch>
                    <Route path="/admin/auth" render={() => <AdminAuthC/>}/>
                    <Route path="/admin" render={() => <AdminPageC/>}/>
                    <Route path="/" render={() => <Content
                        {...this.props}
                        links={this.props.links}
                        paginatorData={this.props.paginatorData}
                        productsData={this.props.productsData}
                        findProducts={this.props.findProducts}
                        setPortionNumAC={this.props.setPortionNumAC}
                        setCurrentPageAC={this.props.setCurrentPageAC}
                        getProducts={this.props.getProducts}
                        cartData={this.props.cartData}
                        deleteItemByIndex={this.props.deleteItemByIndex}
                        createOrder={this.props.createOrder}
                    />}/>
                </Switch>
            </div>
        );
    }
}

//==============================================

const mapStateToProps = (state) => {
    return ({
        initialized: state.mainReducer.initialized,
        links: state.mainReducer.links,
        paginatorData: state.paginatorReducer,
        productsData: state.productsReducer,
        cartData: state.cartReducer,
    });
};

let AppContainer = compose(     //  HOC FOR APP TO PROVIDE MSTP AND MDTP
    withRouter,
    connect(mapStateToProps, {initApp, findProducts, setPortionNumAC,
        setCurrentPageAC, getProducts, deleteItemByIndex, createOrder})
)(App);

//==============================================
//  PROVIDES APP_CONTAINER WITH PROVIDER (STORE)
let AppWrapperF = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {/*<MainContextProvider>*/}
                <AppContainer/>
                {/*</MainContextProvider>*/}
            </Provider>
        </BrowserRouter>
    );
}

export default AppWrapperF;