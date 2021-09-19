import React, {useEffect} from 'react';
import s from "./MainPage.module.css";
import SectionsPane from "../SectionsPane/SectionsPane";
import SlickSlider from "../Slider/SlickSlider";
import {Route, Switch, useLocation} from "react-router-dom";
import SearchWrapper from "../SearchPage/SearchWrapper";
import Paginator from "../../extra/Paginator/Paginator";

const MainPage = (props) => {

    let pn = useLocation().pathname;

    const onPageChanged = (pageNumber) => {
        if (pn==='/') {
            props.setCurrentPageAC(pageNumber);
            props.getProducts(pageNumber, props.paginatorData.pageLimit);
        }
    }

    useEffect(()=>onPageChanged(1), [pn]);

    return (
        <div className={s.mainPage}>
            <h1>MAIN PAGE</h1>

            <SlickSlider/>

            <Switch>
                <Route path="/search" render={() => <div>
                    <SearchWrapper
                    products={props.productsFound}
                    findProducts={props.findProducts}
                    paginatorData={props.paginatorData}
                    setPortionNum={props.setPortionNumAC}
                    setCurrentPage={props.setCurrentPageAC}
                >
                    <SectionsPane products={props.productsFound} />
                </SearchWrapper>
                </div>
                }/>
                <Route path="/" render={() => <div>
                    <SectionsPane products={props.products}/>
                    <Paginator
                        paginatorData={props.paginatorData}
                        setPortionNum={props.setPortionNumAC}
                        onPageChanged={onPageChanged}
                    />
                </div>
                }/>
            </Switch>

        </div>
    );
}

export default MainPage;