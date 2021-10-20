import React from 'react';
import {NavLink} from "react-router-dom";
import global_data from "../../../REDUX/global_data";

function OrderDone() {
    return (
                <div>
                    Ваше замовлення вже на розгляді
                    З Вами зв'яжеться співробітник

                    Є питання? Подзвоніть нам!
                    <ul>
                        <li>{global_data.phones[0]}</li>
                        <li>{global_data.phones[1]}</li>
                        <li>{global_data.phones[2]}</li>
                    </ul>
                    <NavLink to={"/order"} >Зробити ще одне замовлення</NavLink>
                </div>

    );
}

export default OrderDone;