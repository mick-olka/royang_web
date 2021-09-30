import React from 'react';
import "./content.css";
import {Route, Switch} from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import ProductPageC from "./Product/ProductPageC";
import Search from "./SearchPage/Search";
import SearchWrapper from "./SearchPage/SearchWrapper";
import SectionsPane from "./SectionsPane/SectionsPane";
import MainPage from "./MainPageC/MainPage";
import OrderPage from "./OrderPage/OrderPage";

function Content({links, paginatorData, productsData, cartData, findProducts,
                     getProducts, setPortionNumAC, setCurrentPageAC, ...props}) {
    return (
        <div>
            <Header/>
            <div className="middle_pane">
                <div className="side_pane" >
                    <Search redirectTo={"/search"} {...props} />
                    <Navbar links={links}/>
                </div>
                <div className="content_pane">
                    <Switch>
                        <Route path="/info" render={() => <h1>INFO</h1>}/>
                        <Route path="/products/:prodId" render={() => <ProductPageC/>}/>

                        <Route path="/order" render={() => <OrderPage cartData={cartData} /> }/>

                        <Route path="/search" render={() => <div>
                            <SearchWrapper
                                {...props}
                                products={productsData.productsFound}
                                paginatorData={paginatorData}
                                findProducts={findProducts}
                                setPortionNum={setPortionNumAC}
                                setCurrentPage={setCurrentPageAC}   >
                                <SectionsPane products={productsData.productsFound}/>
                            </SearchWrapper>
                        </div>  }/>

                        <Route path="/" render={() => <MainPage
                            {...props}
                            products={productsData.products}
                            paginatorData={paginatorData}
                            setCurrentPageAC={setCurrentPageAC}
                            getProducts={getProducts}
                            setPortionNumAC={setPortionNumAC}
                        />}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Content;