import React from 'react';
import loading from "../../IMGS/loading.gif";

function Loading(props) {
    return (
        <div>
            <img style={{width: "15rem", position: "relative", left: "45%", top: "10rem"}} src={loading} alt="loading"/>
        </div>
    );
}

export default Loading;