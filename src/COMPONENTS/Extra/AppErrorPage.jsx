import React from 'react';
import s from "./ExtraPages.module.css";
import Loading from "./Loading";

function AppErrorPage({error}) {
    return (
        <div className={s.container}>
            <p>Вибачте, у нас тимчасові технічні проблеми :(</p>
            <p style={{top: "10rem"}} >Магазин скоро повернеться</p>
            {/*<h1>{error}</h1>*/}
            <Loading />
        </div>
    );
}

export default AppErrorPage;