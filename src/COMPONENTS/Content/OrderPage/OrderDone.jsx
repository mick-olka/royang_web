import React from 'react';
import {ContactsContext} from "../../../UTILS/contacts_context";
import {NavLink} from "react-router-dom";

function OrderDone() {
    return (<ContactsContext.Consumer>
            {({phones, mail})=>(
                <div>
                    Ваше замовлення вже на розгляді
                    З Вами зв'яжеться співробітник

                    Є питання? Подзвоніть нам!
                    <ul>
                        <li>{phones[0]}</li>
                        <li>{phones[1]}</li>
                        <li>{phones[2]}</li>
                    </ul>
                    <NavLink to={"/order"} >Зробити ще одне замовлення</NavLink>
                </div>
            )}
        </ContactsContext.Consumer>
    );
}

export default OrderDone;