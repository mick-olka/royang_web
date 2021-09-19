import React, {useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import Paginator from "../../extra/Paginator/Paginator";

function SearchWrapper({findProducts, paginatorData, onPageChanged, products, setPortionNum, setCurrentPage, ...props}) {

    const search = useLocation().search;
    const string = new URLSearchParams(search).get('search');

    useEffect(()=>{findProducts(string); setCurrentPage(1); setPortionNum(1)},  //  reset paginator on new search
        [string]);

    const onSearchPageChanged = (pageNumber) => {   //  on next page in search for paginator
        setCurrentPage(pageNumber);
        findProducts(string, pageNumber, paginatorData.pageLimit);
    }

    return (<div>
                <h2>Results for {string}</h2>

                <p><NavLink to="/">MAIN</NavLink></p>

                {products.length > 0 ? null : <h2>Nothing Found</h2>}

                {props.children}
                <Paginator
                    paginatorData={paginatorData}
                    setPortionNum={setPortionNum}
                    onPageChanged={onSearchPageChanged}
                />
        </div>
    );
}

export default SearchWrapper;