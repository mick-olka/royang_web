import React, {useEffect, useState} from 'react';
import OrderForm from "./OrderForm";
import s from "./OrderPage.module.css"
import {NavLink} from "react-router-dom";

function OrderPage({cartData, deleteItemByIndex, createOrder, updateItemCount, ...props}) {

    let [alert, setAlert] =useState(null);  //  in case user haven't chosen product and pressed confirm

    useEffect(()=>{
        localStorage.cart=JSON.stringify(cartData.cart);    //  save cart items to localStorage on cart change
    }, [cartData]);

    const onSubmit = (values) => {
        let orderData = {...values, sum: cartData.sum, cart: cartData.cart};
        if (orderData.cart.length>0) {
            setAlert(null);
            createOrder(orderData);
            for (let i=0; i<cartData.cart.length; i++) {
                deleteItemByIndex(cartData.cart[i].index);
            }
            props.history.push("/order_done");
        }
        else setAlert("Спочатку Оберіть Товар :)");
    }

    return (
        <div className={s.container} >
            <h1 className={s.heading_h} >Корзина</h1>
            <div className={s.cart_box}>
                {cartData.cart.map(item=>{
                    return <div key={item.code} className={s.cart_item} > {/*need more complex key*/}
                        <img className={s.thumbnail} src={item.photo} alt="prod_img"/>
                        <p><NavLink to={"products/"+item.product}> {item.name}</NavLink></p>
                        <p>колір: {item.mainColor}/{item.pillColor}</p>
                        <span>к-ть: </span><input type="number" onChange={(e)=>{updateItemCount(item.index, e.target.value)}} min="1" value={item.count} ></input>
                        <p>вартість: {item.price*item.count}</p>
                        <button className={s.delete_btn} onClick={()=>deleteItemByIndex(item.index)} > </button>
                    </div>
                })}

            </div>
            <div style={{width: "fit-content", margin: "0 auto"}} >
            <NavLink to="/"><p className={s.go_choose} >Додати Товар</p></NavLink>
            </div>

            <div className={s.form_box}>
            <div><p className={s.sum_p} >Всього: {cartData.sum} грн</p></div>

            <OrderForm onSubmit={onSubmit} />
            <div className={s.alert} >{alert}</div>

            </div>
        </div>
    );
}

export default OrderPage;