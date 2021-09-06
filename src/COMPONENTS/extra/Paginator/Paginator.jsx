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

    console.log(totalItemsCount);

    return (
        <div className={s.pageIndex}>
            <button disabled={currentPage===1} onClick={()=>{onPageChanged0(currentPage-1)}}> {'prev'} </button>
            {portionNum >1 && <button onClick={()=>{setPortionNum(portionNum-1)}}> {'<'} </button>}
            <div>
            {pagesIndexes}
            </div>
            {portionsCount > portionNum && <button onClick={()=>{setPortionNum(portionNum+1)}}> {'>'} </button>}
            <button disabled={currentPage===pagesCount} onClick={()=>{onPageChanged0(currentPage+1)}}> {'next'} </button>
        </div>
    );
}

export default Paginator;