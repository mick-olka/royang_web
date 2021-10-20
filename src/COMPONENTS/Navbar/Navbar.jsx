import React from 'react';
import {NavLink} from "react-router-dom";
import "../Content/content.css";
import s from "./Navbar.module.css";
import { NavHashLink } from 'react-router-hash-link';

const Navbar = ({links, isHashLinks}) => {

    let links0 = links.map(l=> {
        if (isHashLinks) return <div className={s.linkDiv} key={l.url}><NavHashLink to={l.url} activeClassName={s.activeLink}>{l.name}</NavHashLink></div>

        return (
                <div className={s.linkDiv} key={l.url}><NavLink exact to={l.url} activeClassName={s.activeLink}>{l.name}</NavLink></div>
            )
        }
    );

    return (
        <div className={s.navbar_pane}>
            <nav>
                {links0}
            </nav>
        </div>
    );
}

export default Navbar;
