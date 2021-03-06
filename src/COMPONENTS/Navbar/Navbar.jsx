import React from 'react';
import "../Content/content.css";
import s from "./Navbar.module.css";
import { NavHashLink } from 'react-router-hash-link';

const Navbar = ({links}) => {

    let links0 = links.map(l=> {

        return (
                <div className={s.linkDiv} key={l.url}>
                    <NavHashLink exact to={l.url} activeClassName={s.activeLink}>{l.name["ua"] || l.name}</NavHashLink>
                </div>
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
