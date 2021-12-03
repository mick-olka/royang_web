import React from "react";
import './App.css';
import {Component} from "react";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store from "../REDUX/reduxStore";
import {initApp, setError} from "../REDUX/reducers/mainReducer";
import Content from "../COMPONENTS/Content/Content";
import {Switch} from "react-router-dom";
import AdminAuthC from "../COMPONENTS/ADMIN/AuthAdmin/AdminAuthC";
import {getProducts} from "../REDUX/reducers/productsReducer";
import {setCurrentPageAC} from "../REDUX/reducers/paginatorReducer";
import {createOrder, deleteItemByIndex, updateItemCount} from "../REDUX/reducers/cartReducer";
import {TextContext} from "../UTILS/text_context";
import Loading from "../COMPONENTS/Extra/Loading";
import PopupWrapper from "../COMPONENTS/Extra/Popup/PopupWrapper";
import Popup from "../COMPONENTS/Extra/Popup/Popup";
import AppErrorPage from "../COMPONENTS/Extra/AppErrorPage";

const AdminPageC = React.lazy(()=>import("../COMPONENTS/ADMIN/AdminPageC/AdminPageC"));

const adminPageCWithSuspense =()=> {
    return <React.Suspense fallback={<div>...Loading...</div>} >
        <AdminPageC />
    </React.Suspense>
}

export const setErrorF = (err_text) => {
    this.props.setError(err_text);
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state={showPopup: false, reason: null};
    }

    catchAllUnhandledErrors = (reason, promise) => {
        this.setState({showPopup: true, reason: "Виникла Якась Помилка :("});
    }

    componentDidMount() {
        //  for uncaught errors
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
        this.props.initApp(this.props.paginatorData.currentPage, this.props.paginatorData.pageLimit);   //  has promise in reducer, takes time to set
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.error!==null) {
    //         let small_popup = document.getElementById("small_popup");
    //         small_popup.innerText = this.props.error;
    //         small_popup.style.right = "1px";
    //         small_popup.style.opacity="1";
    //         setTimeout(() => {
    //             small_popup.style.right = "-5rem";
    //             small_popup.style.opacity="0";
    //         }, 1000);
    //     }
    // }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }


    render() {

        if (!this.props.initialized) return <div className="App"><Loading /></div>

        // if (this.props.error) return <AppErrorPage error={this.props.error} />

        return (
            <div className="App">

                {this.state.showPopup &&
                <PopupWrapper onClose={()=>this.setState({showPopup: false})} >
                    {(closePopup) => (<Popup closePopup={closePopup} message={this.state.reason} />)}
                </PopupWrapper>
                }

                <div id="popup_root" />
                <div id="small_popup" />

                <TextContext.Provider value={this.props.text_blocks}>
                <Switch>
                    <Route path="/admin/auth" render={() => <AdminAuthC/>}/>
                    <Route path="/admin" render={adminPageCWithSuspense}/>
                    <Route path="/some_error" render={()=><AppErrorPage/>}/>
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
                        updateItemCount={this.props.updateItemCount}
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
        error: state.mainReducer.error,
    });
};

let AppContainer = compose(     //  HOC FOR APP TO PROVIDE MSTP AND MDTP
    withRouter,
    connect(mapStateToProps, {initApp,
        setCurrentPageAC, getProducts, deleteItemByIndex, createOrder, updateItemCount, setError})
)(App);

//==============================================
//  PROVIDES APP_CONTAINER WITH PROVIDER (STORE)
let AppWrapperF = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    );
}

export default AppWrapperF;