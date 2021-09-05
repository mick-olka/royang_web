import React from 'react';
import s from "./Paginator.module.css";

function Paginator({totalItemsCount,
                       pageSize,
                       onPageChanged,
                       currentPage,
                       portionSize, //  portion is a few indexes
                       portionNum, //   that are shown like << 1 2 3 >>
                       setPortionNum}) {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let portionsCount = Math.ceil(pagesCount / portionSize);
    let leftPortionEdge = (portionNum -1 )*portionSize ;
    let rightPortionEdge = (portionNum * portionSize);

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

    console.log(totalItemsCount);

    return (
        <div className={s.pageIndex}>
            <button onClick={()=>{setPortionNum(1)}}> {'<<'} </button>
            {portionNum >1 && <button onClick={()=>{setPortionNum(portionNum-1)}}> {'<'} </button>}
            <div>
            {pagesIndexes}
            </div>
            {portionsCount > portionNum+1 && <button onClick={()=>{setPortionNum(portionNum+1)}}> {'>'} </button>}
            <button onClick={()=>{setPortionNum(portionsCount)}}> {'>>'} </button>
        </div>
    );
}

export default Paginator;