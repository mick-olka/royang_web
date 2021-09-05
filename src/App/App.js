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
import {MainContextProvider} from "../UTILS/mainContext";
import {findProducts} from "../REDUX/reducers/productsReducer";

class App extends Component {

    catchAllUnhandledErrors = (reason, promise) => {
        alert("Error: "+reason);
    }

    componentDidMount() {
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
        this.props.initApp(this.props.pageNum, this.props.pageLimit);   //  has promise in reducer, takes time to set
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
                    <Route path="/" render={() => (<Content
                        links={this.props.links}
                        findProducts={this.props.findProducts}
                        {...this.props}
                    />)}/>
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
        pageNum: state.productsReducer.paginatorData.currentPage,
        pageLimit: state.productsReducer.paginatorData.pageLimit,
    });
};

let AppContainer = compose(     //  HOC FOR APP TO PROVIDE MSTP AND MDTP
    withRouter,
    connect(mapStateToProps, {initApp, findProducts})
)(App);

//==============================================

let AppWrapperF = (props) => {  //  PROVIDES APP_CONTAINER WITH PROVIDER (STORE)
    return (
        <BrowserRouter>
            <Provider store={store}>
                <MainContextProvider>
                <AppContainer/>
                </MainContextProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default AppWrapperF;