import React from 'react';
import s from "./Header.module.css";
import {ContactsContext} from "../../UTILS/contacts_context";

const Header = (props) => {
    return (<ContactsContext.Consumer>
            {({phones, mail}) => (
                <div className={s.header}>
                    <div className={s.name}>
                        <h1>ROTANG.UA</h1>
                    </div>
                    <div>
                        <ul>
                            <li>{phones[0]}</li>
                            <li>{phones[1]}</li>
                            <li>{phones[2]}</li>
                        </ul>
                    </div>
                </div>)}
        </ContactsContext.Consumer>
    );
}

export default Header;