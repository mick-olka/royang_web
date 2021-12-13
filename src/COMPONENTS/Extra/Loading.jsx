import React from 'react';
import loading from "../../IMGS/loading.gif";
import s from "../Header/Header.module.css";
import s_extra from "./ExtraPages.module.css";

function Loading(props) {
    let div_style = {position: "relative", top: "10rem", width: "100%", display: "flex", justifyContent: "center"};
    let header_style = {fontSize: "3rem", fontWeight: "bolder", color: "#C55A03FF", marginLeft: "6rem"};
    return (
        <div style={div_style} >
            <div>
            <h2 className={s_extra.header} style={header_style} >ROTANG<span className={s.or_l} style={{fontSize: "2rem", position: "relative", top: "-15px"}} >®</span>
            </h2>
            <img style={{width: "25rem"}} src={loading} alt="loading"/>
            </div>
        </div>
    );
}

export default Loading;