import React from 'react';
import s from "./Paginator.module.css";

function Paginator({paginatorData, setPortionNum, onPageChanged}) {
    const {totalItemsCount, pageLimit, portionNum, portionSize, currentPage} = paginatorData;
//  portion is a few indexes
    let pagesCount = Math.ceil(totalItemsCount / pageLimit);
    let portionsCount = Math.ceil(pagesCount / portionSize);
    let leftPortionEdge = (portionNum -1 )*portionSize ;
    let rightPortionEdge = (portionNum * portionSize);

    const onPageChanged0 = (p) => {
        onPageChanged(p);
        let a = Math.ceil(p / portionSize);
        setPortionNum(a);
    };

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let pagesIndexes = pages
        .filter(p => (p>=leftPortionEdge && p<=rightPortionEdge))
        .map((p) => {
            return <span
                key={p}
                onClick={(e) => {onPageChanged(p)}}
                className={currentPage === p ? s.selectedPage : undefined}>{p}</span>;
    });

    // console.log("total i: "+totalItemsCount);
    if (totalItemsCount>0)
    return ( <div className={s.pageIndex}>
        <button disabled={currentPage===1} onClick={()=>{onPageChanged0(currentPage-1)}}> {'prev'} </button>
        {portionNum >1 && <button onClick={()=>{setPortionNum(portionNum-1)}}> {'<'} </button>}
        <div>
            {pagesIndexes}
        </div>
        {portionsCount > portionNum && <button onClick={()=>{setPortionNum(portionNum+1)}}> {'>'} </button>}
        <button disabled={currentPage===pagesCount} onClick={()=>{onPageChanged0(currentPage+1)}}> {'next'} </button>
    </div>)
        else return <div>No Products For Paginator</div>;
}

export default Paginator;