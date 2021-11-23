import React from 'react';
import {createPortal} from "react-dom";
import s from "./Popup.module.css";

function PopupWrapper(props) {

    const container = document.getElementById("popup_root");
    return (
        createPortal(
            <div className={s.background} onClick={props.onClose} >
                <div className={s.popup} onClick={e=>e.stopPropagation()} >
                    {props.children(props.onClose)}
                </div>
            </div>,
            container,
        )
    );
}

export default PopupWrapper;