import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./Orders.module.css";

function OrdersItem({item}) {
    return (
        <div className={s.orders_item} >
            <p style={{marginLeft: "1rem"}} ><NavLink to={"/ADMIN/orders/"+item._id}> {item.name}</NavLink></p>
            <p>{item.phone}</p>
            <p>{item.status}</p>
        </div>
    );
}

export default OrdersItem;