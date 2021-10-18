import React from 'react';
import s from "./SectionsPane.module.css";
import ProductCard from "../ProductCard/ProductCard";

const SectionsPane=({products})=>{

    let productsList = products.map((p)=>{
        return <ProductCard
            key={p._id}
            _id={p._id}
            name={p.name}
            thumbnail={p.thumbnail}
            price={p.price}
            oldPrice={p.oldPrice}
        />
    });

    return (
        <div className={s.sectionsPane} >
            {productsList.length<1 ? <h2>No Products</h2> : productsList}
        </div>
    );
}

export default SectionsPane;