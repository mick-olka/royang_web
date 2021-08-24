import React from 'react';
import "./content.css";
import {Route, Switch} from "react-router-dom";
import MainPageC from "./MainPageC/MainPageC";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import NotFound from "../extra/NotFound";
import ProductPageC from "./Product/ProductPageC";

function Content({links}) {
    return (
        <div>
            <Header/>
            <div className="middle_pane">
                <Navbar links={links}/>
                <div className="content_pane" >
                    <Switch>
                    <Route exact path="/" render={() => <MainPageC /> }/>
                    <Route path="/info" render={() => <h1>INFO</h1> }/>
                        <Route path="/products/:prodId" render={() => <ProductPageC /> }/>
                    <Route render={()=>(<NotFound />)} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Content;