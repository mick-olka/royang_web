import React, {useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import PaginatorC from "../extra/Paginator/PaginatorC";

function SearchWrapper({findProducts, onPageChanged, products, setCurrentPage, setPortionNumAC, ...props}) {

    const search = useLocation().search;
    const string = new URLSearchParams(search).get('search');

    useEffect(()=>{findProducts(string); setCurrentPage(1); setPortionNumAC(1)},  //  reset paginator on new search
        [string]);  // eslint-disable-line react-hooks/exhaustive-deps

    const onSearchPageChanged = (pageNumber) => {   //  on next page in search for paginator
        setCurrentPage(pageNumber);
        findProducts(string, pageNumber);
    }

    return (<div>
                <h2>Results for {string}</h2>

                <p><NavLink to="/">MAIN</NavLink></p>

                {products.length > 0 ? null : <h2>Nothing Found on "{string}"</h2>}

                {props.children}
                <PaginatorC onPageChanged={onSearchPageChanged} />
        </div>
    );
}

export default SearchWrapper;