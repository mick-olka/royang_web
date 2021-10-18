import React from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import cart_icon from "../../IMGS/ICONS/laundry-basket_color.png"
import global_data from "../../REDUX/global_data";

const Header = (props) => {
    return (<div className={s.header}>
                    <div className={s.name_div}>
                        <NavLink style={{textDecoration: "none"}} to={"/"}>
                        <h1>
                            <span className={s.or_l} >R</span>
                            <span className={s.bor_l} >O</span>
                            <span className={s.or_l} >T</span>
                            <span className={s.bor_l} >A</span>
                            <span className={s.or_l} >N</span>
                            <span className={s.bor_l} >G</span>
                            <span className={s.or_l} >.</span>
                            <span className={s.bor_l} >U</span>
                            <span className={s.or_l} >A</span>
                        </h1>
                        </NavLink>
                    </div>
                    <div className={s.phones_div} >
                        <ul>

                           <li className={s.phone_li} >{global_data.phones[0]}</li>
                           <li className={s.phone_li} >{global_data.phones[1]}</li>
                           <li className={s.phone_li} >{global_data.phones[2]}</li>

                        </ul>
                    </div>
                    <div className={s.call_time_div}>
                        <p>з 9:00 по 20:00</p>
                    </div>
                    <div className={s.cart_div}>
                        <NavLink to="/order" >
                            <img className={s.cart_icon} src={cart_icon} alt="cart_icon"/>
                        </NavLink>
                    </div>
                </div>
    );
}

export default Header;