import React from 'react';

function AppErrorPage({error}) {
    return (
        <div>
            <p>Вибачте, у нас тимчасові технічні проблеми :(</p>
            <p>Магазин скоро повернеться</p>
            <h1>{error}</h1>
        </div>
    );
}

export default AppErrorPage;