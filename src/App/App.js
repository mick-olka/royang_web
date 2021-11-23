import React from "react";
import './App.css';
import {Component} from "react";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store from "../REDUX/reduxStore";
import {initApp} from "../REDUX/reducers/mainReducer";
import Content from "../COMPONENTS/Content/Content";
import {Switch} from "react-router-dom";
import AdminAuthC from "../COMPONENTS/ADMIN/AuthAdmin/AdminAuthC";
import {getProducts} from "../REDUX/reducers/productsReducer";
import {setCurrentPageAC} from "../REDUX/reducers/paginatorReducer";
import {createOrder, deleteItemByIndex, updateItemCount} from "../REDUX/reducers/cartReducer";
import {TextContext} from "../UTILS/text_context";
import Loading from "../COMPONENTS/Extra/Loading";
import SomeError from "../COMPONENTS/Extra/SomeError";
import PopupWrapper from "../COMPONENTS/Extra/Popup/PopupWrapper";
import Popup from "../COMPONENTS/Extra/Popup/Popup";

const AdminPageC = React.lazy(()=>import("../COMPONENTS/ADMIN/AdminPageC/AdminPageC"));

const adminPageCWithSuspense =()=> {
    return <React.Suspense fallback={<div>...Loading...</div>} >
        <AdminPageC />
    </React.Suspense>
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isServerError && this.state.showPopup===false) {
            this.setState({showPopup: true, reason: "З нашим сервером щось сталося :( Магазин скоро запрацює!"});
        }
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }


    render() {

        if (!this.props.initialized) return <div className="App"><Loading /></div>

        return (
            <div className="App">

                {this.state.showPopup &&
                <PopupWrapper onClose={()=>this.setState({showPopup: false})} >
                    {(closePopup) => (<Popup closePopup={closePopup} message={this.state.reason} />)}
                </PopupWrapper>
                }

                <div id="popup_root"></div>
                <TextContext.Provider value={this.props.text_blocks}>
                <Switch>
                    <Route path="/admin/auth" render={() => <AdminAuthC/>}/>
                    <Route path="/admin" render={adminPageCWithSuspense}/>
                    <Route path="/some_error" render={()=><SomeError/>}/>
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
        isServerError: state.mainReducer.isServerError,
    });
};

let AppContainer = compose(     //  HOC FOR APP TO PROVIDE MSTP AND MDTP
    withRouter,
    connect(mapStateToProps, {initApp,
        setCurrentPageAC, getProducts, deleteItemByIndex, createOrder, updateItemCount})
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