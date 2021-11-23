import React from 'react';
import {NavLink} from "react-router-dom";

function SomeError(props) {
    return (
        <div>
            <p>Вибачте, у нас тимчасові технічні проблеми :(</p>
            <p>Магазин скоро повернеться</p>
            <h1>{props.error}</h1>
            <NavLink to={props.returnTo} >Return back</NavLink>
        </div>
    );
}

export default SomeError;