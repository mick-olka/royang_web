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
    return ( <div className={s.paginator}>
        <button className={s.change_page} disabled={currentPage===1} onClick={()=>{onPageChanged0(currentPage-1)}}> {'попередня'} </button>
        {portionNum >1 && <button className={s.change_portion} onClick={()=>{setPortionNum(portionNum-1)}}> {'<'} </button>}
        <div>
            {pagesIndexes}
        </div>
        {portionsCount > portionNum && <button className={s.change_portion} onClick={()=>{setPortionNum(portionNum+1)}}> {'>'} </button>}
        <button className={s.change_page} disabled={currentPage===pagesCount} onClick={()=>{onPageChanged0(currentPage+1)}}> {'наступна'} </button>
    </div>)
        else return <div>-----------------</div>;
}

export default Paginator;