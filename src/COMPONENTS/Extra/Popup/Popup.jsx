import React from 'react';

function Popup({message, closePopup}) {
    return (
        <div>
            <p>{message}</p>
            <button onClick={closePopup} >Спробуйте ще!</button>
        </div>
    );
}

export default Popup;