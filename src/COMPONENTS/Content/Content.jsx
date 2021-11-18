import React, {useEffect} from 'react';
import "./content.css";
import {Route, Switch} from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import ProductPageC from "./Product/ProductPageC";
import Search from "../SearchPage/Search";
import SectionsPane from "./SectionsPane/SectionsPane";
import MainPage from "./MainPageC/MainPage";
import OrderPage from "./OrderPage/OrderPage";
import SearchPageC from "../SearchPage/SearchPageC";
import ListPageC from "./ListPage/ListPageC";
import OrderDone from "./OrderPage/OrderDone";
import InfoPage from "./InfoPage/InfoPage";
import PhotoGalleryC from "./InfoPage/PhotoGalleryC";
import Colors from "./InfoPage/Colors";

function Content({links, lists, productsData, cartData, getProducts, setCurrentPageAC, deleteItemByIndex, createOrder, colors, ...props}) {

    useEffect(()=>{
        let lists0;
        function findAndRemove(array, property, value) {
            array.forEach(function(result, index) {
                array[index].url="/lists/"+array[index].url;
                if(result[property] === value) {
                    //Remove from array
                    array.splice(index, 1);
                }
            });
        }

        lists0=[...lists];
        findAndRemove(lists0, 'name', 'slider');

    }, [lists]);

    return (
        <div>
            <Header links={links} />
            <div className="middle_pane">

                <div className="side_pane" >
                    <Search redirectTo={"/find"} {...props} />
                    <Navbar links={lists}/>


                </div>
                <div className="content_pane">
                    {/*<div className="horizontal_navbar" >*/}
                    {/*    <Navbar fontSize={"0.5rem"} links={links}/>*/}
                    {/*</div>*/}
                    <Switch>
                        <Route path="/info" render={() => <InfoPage /> }/>

                        <Route path="/products/:prodId" render={() => <ProductPageC/>}/>

                        <Route path="/lists/:listUrl" render={() => <ListPageC/>}/>

                        <Route path="/order_done" render={() => <OrderDone />}/>

                        <Route path="/order" render={() => <OrderPage {...props} deleteItemByIndex={deleteItemByIndex} cartData={cartData} createOrder={createOrder} /> }/>

                        <Route path="/find" render={() => <div>
                            <SearchPageC>
                                <SectionsPane products={productsData.productsFound}/>
                            </SearchPageC>
                        </div>  }/>

                        <Route path="/gallery" render={() => <PhotoGalleryC />}/>

                        <Route path="/colors" render={() => <Colors colors={colors} />}/>

                        <Route path="/" render={() => <MainPage
                            products={productsData.products}
                            setCurrentPageAC={setCurrentPageAC}
                            getProducts={getProducts}
                        />}/>

                        {/*<Route path="*" render={()=><NotFound />}/>*/}

                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Content;