import React from 'react';
import OrderForm from "./OrderForm";
import s from "./OrderPage.module.css"
import {NavLink} from "react-router-dom";

function OrderPage({cartData}) {

    const onSubmit = (values) => {
        // console.log(values);
        // console.log(cartData);
        let orderData = {...values, cart: cartData.cart};
        console.log(orderData);
    }
    // client_data: {
    //     name: "",
    //     phone: "",
    //     message: "",
    // },

    return (
        <div>
            <h1>CART</h1>
            <div className={s.cart_box}>
                {cartData.cart.length<1 ? <NavLink to="/">Go choose product</NavLink> : null}
                {cartData.cart.map(item=>{
                    return <div key={item.product} > {/*need more complex key*/}
                        <p>{item.product}</p>
                        <p>{item.count}</p>
                        <p>{item.sum}</p>
                    </div>
                })}
            </div>

            <OrderForm onSubmit={onSubmit} />
        </div>
    );
}

export default OrderPage;