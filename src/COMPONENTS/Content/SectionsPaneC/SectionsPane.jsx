import React from 'react';
import s from "./SectionsPane.module.css";
import ProductCard from "../ProductCard/ProductCard";

const SectionsPane=(props)=>{

    let productsList = props.products.map((p)=>{
       return <ProductCard
           key={p._id}
           _id={p._id}
           name={p.name}
           thumbnail={p.thumbnail}
           price={p.price}

       />
    });

    return (
        <div className={s.sectionsPage} >
            <h1>SECTIONS</h1>
        <div className={s.sectionsPane} >
            {productsList}
        </div>
        </div>
    );
}

export default SectionsPane;