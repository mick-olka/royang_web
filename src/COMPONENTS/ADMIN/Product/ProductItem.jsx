import React, {useState, useEffect} from 'react';
import list from "../ItemsList/ItemsList.module.css";
import chairIcon from "../../../IMGS/chair.png";
import {NavLink} from "react-router-dom";

function ProductItem({item, currency_value, updateProduct}) {
    const [index, setIndex] = useState(item.index);
    useEffect(() => {
        setIndex(item.index)
    });
    return (<>
            <div className={list.photoBox}>
                <img className={list.photo} src={item.thumbnail ? item.thumbnail : chairIcon}
                     alt="img"/>
            </div>
            <p><NavLink to={"/admin/products/" + item.url_name}>{item.name["ua"]}</NavLink></p>
            <p>{item.price} $</p>
            <p>{item.price * +currency_value.text['ua']} грн</p>
            <p style={{width: '5rem'}} ><input style={{width: '4rem'}} type="number" value={index} onChange={(e) => {
                setIndex(e.target.value);
                updateProduct(item._id, { index: e.target.value });
            }} /></p>
        </>
    );
}

export default ProductItem;