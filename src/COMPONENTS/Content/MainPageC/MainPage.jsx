import React from 'react';
import s from "./MainPage.module.css";
import SectionsPane from "../SectionsPane/SectionsPane";
import SlickSlider from "../Slider/SlickSlider";
import {Route, Switch} from "react-router-dom";

const MainPage = (props) => {

    return (
        <div className={s.mainPage}>
            <h1>MAIN PAGE</h1>

            <SlickSlider/>

            <Switch>
                <Route path="/search" render={() => <>
                    <h2>Search Results</h2>
                    {props.productsFound.length > 0 ? null :
                        <h2>Nothing Found</h2>}
                    <SectionsPane products={props.productsFound}/>
                </>
                }/>
                <Route path="/" render={() => <SectionsPane
                    products={props.products}
                    paginatorData={props.paginatorData}
                    setCurrentPage={props.setCurrentPageAC}
                    setPortionNum={props.setPortionNumAC}
                    getProducts={props.getProducts}
                />}/>
            </Switch>

            {/*{props.productsFound ? <SectionsPane products={props.productsFound} />:<SectionsPane products={props.products} /> }*/}
            {/*<SectionsPane products={props.products} />*/}
        </div>
    );
}

export default MainPage;