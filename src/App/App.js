import React from "react";
import './App.css';
import {Component} from "react";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store from "../REDUX/reduxStore";
import {initApp} from "../REDUX/reducers/mainReducer";
import Content from "../COMPONENTS/Content/Content";
// import AdminPageC from "../COMPONENTS/ADMIN/AdminPageC/AdminPageC";
import {Switch} from "react-router-dom";
import AdminAuthC from "../COMPONENTS/ADMIN/AuthAdmin/AdminAuthC";
import {getProducts} from "../REDUX/reducers/productsReducer";
import {setCurrentPageAC} from "../REDUX/reducers/paginatorReducer";
import {createOrder, deleteItemByIndex} from "../REDUX/reducers/cartReducer";
import {TextContext} from "../UTILS/text_context";
import Loading from "../COMPONENTS/Extra/Loading";

const AdminPageC = React.lazy(()=>import("../COMPONENTS/ADMIN/AdminPageC/AdminPageC"));

const adminPageCWithSuspense =()=> {
    return <React.Suspense fallback={<div>...Loading...</div>} >
        <AdminPageC />
    </React.Suspense>
}

// const contacts = {
//     phones: [
//         "+380962962920",
//         "+380962962920",
//         "+380962962920",
//     ],
//     mail: "nikolaygutsal@gmail.com"
// }

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
        if (!this.props.initialized) return <div className="App"><Loading /></div>
        return (
            <div className="App">
                <TextContext.Provider value={this.props.text_blocks}>
                <Switch>
                    <Route path="/admin/auth" render={() => <AdminAuthC/>}/>
                    <Route path="/admin" render={adminPageCWithSuspense}/>
                    <Route path="/" render={() => <Content
                        {...this.props}//
                        links={this.props.links}//
                        lists={this.props.lists}//
                        productsData={this.props.productsData}//
                        setCurrentPageAC={this.props.setCurrentPageAC}//
                        getProducts={this.props.getProducts}//
                        cartData={this.props.cartData}//
                        deleteItemByIndex={this.props.deleteItemByIndex}//
                        createOrder={this.props.createOrder}//
                        colors={this.props.colors}
                    />}/>
                </Switch>
                </TextContext.Provider>
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
        lists: state.listsReducer.lists,
        text_blocks: state.textReducer.text_blocks,
        colors: state.photosReducer.colors,
    });
};

let AppContainer = compose(     //  HOC FOR APP TO PROVIDE MSTP AND MDTP
    withRouter,
    connect(mapStateToProps, {initApp,
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