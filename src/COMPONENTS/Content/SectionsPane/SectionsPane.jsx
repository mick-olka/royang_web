import React from 'react';
import s from "./SectionsPane.module.css";
import ProductCard from "../ProductCard/ProductCard";
import Paginator from "../../extra/Paginator/Paginator";

const SectionsPane=({products, paginatorData, getProducts, setPortionNum, setCurrentPage})=>{

    let productsList = products.map((p)=>{
        return <ProductCard
            key={p._id}
            _id={p._id}
            name={p.name}
            thumbnail={p.thumbnail}
            price={p.price}

        />
    });

    const onPageChanged = (pageNumber) => {
        setCurrentPage(pageNumber);
        getProducts(pageNumber, paginatorData.pageLimit);
    }

    return (
        <div className={s.sectionsPage} >
            <h1>SECTIONS</h1>
        <div className={s.sectionsPane} >
            {productsList}
        </div>
            <Paginator
                totalItemsCount={paginatorData.totalProductsCount}
                pageSize={paginatorData.pageLimit}
                currentPage={paginatorData.currentPage}
                portionSize={paginatorData.portionSize}
                portionNum={paginatorData.portionNum}
                setPortionNum={setPortionNum}
                onPageChanged={onPageChanged}
            />
        </div>
    );
}

export default SectionsPane;