import React from 'react';
import s from "./Header.module.css";

const Header=(props)=>{
    return (
        <div className={s.header} >
            <div className={s.name}>
                <h1>Header1</h1>
            </div>
        </div>
    );
}

export default Header;