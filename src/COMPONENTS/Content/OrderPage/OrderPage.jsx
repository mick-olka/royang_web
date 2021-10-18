import React, {useState} from 'react';
import OrderForm from "./OrderForm";
import s from "./OrderPage.module.css"
import {NavLink} from "react-router-dom";

function OrderPage({cartData, deleteItemByIndex, createOrder, ...props}) {

    let [alert, setAlert] =useState(null);

    const onSubmit = (values) => {
        let orderData = {...values, sum: cartData.sum, cart: cartData.cart};
        console.log(orderData);
        if (orderData.cart.length>0) {
            setAlert(null);
            createOrder(orderData);
            for (let i=0; i<cartData.cart.length; i++) {
                deleteItemByIndex(cartData.cart[i].index);
            }
            props.history.push("/order_done");
        }
        else setAlert("Choose product");
    }

    //  cart = [{
        // name: "SOFA"
        // photo: "http://192.168.1.164:7500/uploads/2021-09-30T14:00:28.598ZIMG_0509.JPG"
        // code: "3323"
        // count: 1
        // mainColor: "none"
        // pillColor: "none"
        // price: 1400
        // product: "6155a641a0fec0ea7843ca0d"
        // index: 2
    // }]

    return (
        <div className={s.container} >
            <h1 className={s.heading_h} >CART</h1>
            <div className={s.cart_box}>
                <NavLink to="/"><p className={s.go_choose} >Go choose product</p></NavLink>
                {cartData.cart.map(item=>{
                    return <div key={item.index} className={s.cart_item} > {/*need more complex key*/}
                        <img className={s.thumbnail} src={item.photo} alt="prod_img"/>
                        <p><NavLink to={"products/"+item.product}> {item.name}</NavLink></p>
                        <p>count: {item.count}</p>
                        <p>sum: {item.price*item.count}</p>
                        <button className={s.delete_btn} onClick={()=>deleteItemByIndex(item.index)} > </button>
                    </div>
                })}

            </div>

            <div className={s.form_box}>
            <div><p className={s.sum_p} >SUM: {cartData.sum}</p></div>

            <OrderForm onSubmit={onSubmit} />
            <div className={s.alert} >{alert}</div>

            </div>
        </div>
    );
}

export default OrderPage;