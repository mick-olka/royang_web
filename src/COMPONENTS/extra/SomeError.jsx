import React from 'react';
import {NavLink} from "react-router-dom";

function SomeError(props) {
    return (
        <div>
            <p>Some Error Occurred</p>
            <h1>{props.error}</h1>
            <NavLink to={props.returnTo} >Return back</NavLink>
        </div>
    );
}

export default SomeError;