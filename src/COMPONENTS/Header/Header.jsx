import React, {useContext, useEffect, useState} from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import cart_icon from "../../IMGS/ICONS/laundry-basket_color.png"
import global_data from "../../REDUX/global_data";
import {TextContext} from "../../UTILS/text_context";
import Navbar from "../Navbar/Navbar";

const Header = ({links}) => {

    const text_blocks = useContext(TextContext);
    const header_text_block = text_blocks[0].text;

    const [headerBorder, setHeaderBorder] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
    }, [headerBorder]);
    const handleScroll = () => {
        (window.scrollY>20) ? setHeaderBorder(true) : setHeaderBorder(false);
    }

    let header_style = {
        transition: "all 300ms ease-in",
        boxShadow: headerBorder ? "2px 2px 3px 0 rgba(0,0,0,0.55)" : "none"
    }

    return (
        <div className={s.header_container} style={header_style} >
        <div className={s.header}>
            <div className={s.name_div}>
                <NavLink style={{textDecoration: "none"}} to={"/"}>
                    <h1>
                        <span className={s.or_l}>R</span>
                        <span className={s.bor_l}>O</span>
                        <span className={s.or_l}>T</span>
                        <span className={s.bor_l}>A</span>
                        <span className={s.or_l}>N</span>
                        <span className={s.bor_l}>G</span>
                        <span className={s.or_l} style={{fontSize: "2rem", position: "relative", top: "-15px"}} >®</span>
                        {/*<span className={s.bor_l}>U</span>*/}
                        {/*<span className={s.or_l}>A</span>*/}
                    </h1>
                </NavLink>
            </div>
            <div className={s.header_text_div}>
                <p style={{fontSize: "1.2rem"}} >{header_text_block}</p>
            </div>
            <div className={s.phones_div}>
                <ul>

                    <li className={s.phone_li}><a href={"tel:"+ global_data.phones[0]}>{global_data.phones[0]}</a></li>
                    <li className={s.phone_li}><a href={"tel:"+ global_data.phones[1]}>{global_data.phones[1]}</a></li>
                    <li className={s.phone_li}><a href={"tel:"+ global_data.phones[2]}>{global_data.phones[2]}</a></li>

                </ul>
            </div>
            <div className={s.call_time_div}>
                <p>з 9:00 по 20:00</p>
            </div>
            <div className={s.cart_div}>
                <NavLink to="/order">
                    <img className={s.cart_icon} src={cart_icon} alt="cart_icon"/>
                </NavLink>
            </div>
        </div>
            <div className="horizontal_navbar" >
                <Navbar fontSize={"0.5rem"} links={links}/>
            </div>
        </div>
    );
}

export default Header;