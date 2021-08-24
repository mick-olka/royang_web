import React from 'react';
import {NavLink} from "react-router-dom";
import "../Content/content.css";
import s from "./Navbar.module.css";

const Navbar = (props) => {

    let links = [...props.links].map(l=>(
        <div className={s.linkDiv} key={l.url} ><NavLink exact to={l.url} activeClassName={s.activeLink} >{l.name}</NavLink></div>
        )
    );

    return (
        <div className="navbar_pane">
            <nav>
                {links}
            </nav>
        </div>
    );
}

export default Navbar;
