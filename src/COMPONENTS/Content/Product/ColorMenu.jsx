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
            <button onClick={toggleMenu} className={s.open_btn} >{isHidden? "CHOOSE COLOR" : "CLOSE"}</button>
        <div className={s.menu_box}
             style={isHidden ?
                 {display: "none"} :
                 {display: "block"}}
        >

            <button className={s.reset_btn} onClick={onReset} >reset</button>
            <button className={s.x_btn} onClick={toggleMenu} > </button>

            {items}
        </div>
        </div>
    );
}

export default ColorMenu;