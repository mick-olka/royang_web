import React, {useEffect} from 'react';
import s from "./MainPage.module.css";
import SectionsPane from "../SectionsPane/SectionsPane";
import SlickSlider from "../Slider/SlickSlider";
import Paginator from "../../extra/Paginator/Paginator";

const MainPage = ({ paginatorData, products, setCurrentPageAC, getProducts, setPortionNumAC, ...props}) => {

    // let pn = useLocation().pathname;
    const onPageChanged = (pageNumber) => {     //  WHEN RETURNED FROM SEARCH PAGE
            setCurrentPageAC(pageNumber);
            getProducts(pageNumber, paginatorData.pageLimit);
    }
    useEffect(()=> {
        onPageChanged(paginatorData.currentPage);
    }, []);   // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={s.mainPage}>
            <h1>MAIN PAGE</h1>

            <SlickSlider/>

            <div>
                <SectionsPane products={products}/>
                <Paginator
                    paginatorData={paginatorData}
                    setPortionNum={setPortionNumAC}
                    onPageChanged={onPageChanged}   />
            </div>

            {/*<Switch>*/}
            {/*    /!*<Route path="/search" render={() => <div>*!/*/}
            {/*    /!*    <SearchWrapper*!/*/}
            {/*    /!*        products={productsFound}*!/*/}
            {/*    /!*        findProducts={findProducts}*!/*/}
            {/*    /!*        paginatorData={paginatorData}*!/*/}
            {/*    /!*        setPortionNum={setPortionNumAC}*!/*/}
            {/*    /!*        setCurrentPage={setCurrentPageAC} >*!/*/}
            {/*    /!*        <SectionsPane products={productsFound}/>*!/*/}
            {/*    /!*    </SearchWrapper>*!/*/}
            {/*    /!*</div>  }/>*!/*/}

            {/*    <Route path="/" render={() => <div>*/}
            {/*        <SectionsPane products={products}/>*/}
            {/*        <Paginator*/}
            {/*            paginatorData={paginatorData}*/}
            {/*            setPortionNum={setPortionNumAC}*/}
            {/*            onPageChanged={onPageChanged}   />*/}
            {/*    </div>  }/>*/}
            {/*</Switch>*/}

        </div>
    );
}

export default MainPage;