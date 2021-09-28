import React, {useState} from 'react';
import s from "./ColorMenu.module.css"

function ColorMenu({colors}) {  //  colors = { name: Str, src: Url }

    let [isHidden, setIsHidden] = useState(true);
    const toggleMenu = () => {
        setIsHidden(!isHidden);
    }

    let list = ["0==", "1==", "2=="];
    let items = list.map(i=> {
        return <div key={i} className={s.item} >
            {i}
        </div>
    });

    return (<div className={s.container}  >
            <button onClick={toggleMenu} >CHOOSE COLOR</button>
        <div className={s.menu_box} style={isHidden ?
            {transition: 'max-height 0.3s ease-in', maxHeight: "0"} :
            {transition: 'max-height 0.5s ease-in', maxHeight: "100%"}} >
            <button onClick={toggleMenu} >X</button>
            {items}
        </div>
        </div>
    );
}

export default ColorMenu;