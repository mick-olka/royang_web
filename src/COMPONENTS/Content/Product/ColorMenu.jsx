import React, {useState} from 'react';
import s from "./ColorMenu.module.css"

function ColorMenu({colors, setColors, reset}) {  //  colors = { name: Str, src: Url }

    let [isHidden, setIsHidden] = useState(true);
    const toggleMenu = () => {
        setIsHidden(!isHidden);
    }
    let [chosenId, setChosenId] = useState(null);

    const onSetColors =(id) => {
        setColors(id);
        setChosenId(id);
    }

    const onReset =()=> {
        reset();
        setChosenId(null);
    }

    //let list = ["0==", "1==", "2=="];
    let items = colors.map(i=> {
        return <div key={i._id} className={s.item} onClick={()=>onSetColors(i._id)}
        style={chosenId===i._id? {fontWeight: "bold"}:{fontWeight: "normal"}}>
            <span>{i.mainColor}</span>
            <span>{i.pillColor}</span>
        </div>
    });

    return (<div className={s.container}  >
            <button onClick={toggleMenu} >CHOOSE COLOR</button>
        <div className={s.menu_box} style={isHidden ?
            {transition: 'max-height 0.3s ease-in', maxHeight: "0"} :
            {transition: 'max-height 0.5s ease-in', maxHeight: "100%"}} >
            <button onClick={toggleMenu} >X</button>
            <button onClick={onReset} >reset</button>
            {items}
        </div>
        </div>
    );
}

export default ColorMenu;