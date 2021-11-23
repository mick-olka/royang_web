import React from 'react';
import {NavLink} from "react-router-dom";
import global_data from "../../../REDUX/global_data";
import s from "./OrderPage.module.css";

function OrderDone() {
    return (
                <div className={s.order_done_div} >
                    <p>Ваше замовлення вже на розгляді</p>
                    <br/>
                    <p>З Вами зв'яжеться співробітник</p>
                    <br/>
                    <p>Є питання? Подзвоніть нам!</p>
                    <br/><br/>
                    <ul>
                        <li><a href={"tel:"+ global_data.phones[0]}>{global_data.phones[0]}</a></li>
                        <li><br/></li>
                        <li><a href={"tel:"+ global_data.phones[1]}>{global_data.phones[1]}</a></li>
                        <li><br/></li>
                        <li><a href={"tel:"+ global_data.phones[2]}>{global_data.phones[2]}</a></li>
                    </ul>

                </div>

    );
}

export default OrderDone;