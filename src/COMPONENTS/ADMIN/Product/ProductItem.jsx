import React from 'react';
import list from "../ItemsList/ItemsList.module.css";
import chairIcon from "../../../IMGS/chair.png";
import {NavLink} from "react-router-dom";

function ProductItem({item}) {
    return (<>
            <div className={list.photoBox}>
                <img className={list.photo} src={item.thumbnail ? item.thumbnail : chairIcon}
                     alt="img"/>
            </div>
            <p><NavLink to={"/ADMIN/products/" + item._id}>{item.name}</NavLink></p>
            <p>{item.price} грн</p>
        </>
    );
}

export default ProductItem;