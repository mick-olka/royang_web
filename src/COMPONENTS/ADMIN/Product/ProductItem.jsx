import React from 'react';
import list from "../ItemsList/ItemsList.module.css";
import chairIcon from "../../../IMGS/chair.png";
import {NavLink} from "react-router-dom";

function ProductItem({item, currency_value}) {
    return (<>
            <div className={list.photoBox}>
                <img className={list.photo} src={item.thumbnail ? item.thumbnail : chairIcon}
                     alt="img"/>
            </div>
            <p><NavLink to={"/admin/products/" + item.url_name}>{item.name["ua"]}</NavLink></p>
            <p>{item.price} $</p>
            <p>{item.price * +currency_value.text['ua']} грн</p>
        </>
    );
}

export default ProductItem;