import React from 'react';
import "./content.css";
import {Route, Switch} from "react-router-dom";
import MainPageC from "./MainPageC/MainPageC";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import ProductPageC from "./Product/ProductPageC";
import Search from "../extra/Search";

function Content({links, findProducts, paginatorReducer, productsReducer, ...props}) {
    return (
        <div>
            <Header/>
            <div className="middle_pane">
                <div>
                    <Search redirectTo={"/search"} {...props} />
                    <Navbar links={links}/>
                </div>
                <div className="content_pane">
                    <Switch>
                        <Route path="/info" render={() => <h1>INFO</h1>}/>
                        <Route path="/products/:prodId" render={() => <ProductPageC/>}/>
                        <Route path="/" render={() => <MainPageC/>}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Content;