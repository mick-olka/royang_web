import React from 'react';
import {NavLink} from "react-router-dom";

function OrderItem({item}) {
    return (
        <>
            <p><NavLink to={"/ADMIN/orders/"+item._id}> {item.name}</NavLink></p>
            <p>{item.phone}</p>
            <p>{item.status}</p>
        </>
    );
}

export default OrderItem;