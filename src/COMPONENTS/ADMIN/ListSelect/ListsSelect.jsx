import React, {useState} from 'react';
import Select from 'react-select';
import s from "./ListSelect.module.css";

function ListsSelect({lists, addElement, prodIdArr}) {

    let [chosenLists, setChosenLists] = useState([]);

    const handleSelectSubmit = () => {
        let chosen_lists = chosenLists.map(l => {
            return l.value;
        });
        for (let i=0; i<prodIdArr.length; i++) {
            addElement(chosen_lists, prodIdArr[i]);
        }
        setChosenLists([]);
    }

    let typesToSelect = [];
    let l0;
    if (lists) {
        for (let i=0; i<lists.length; i++) {
            //let productHasType = productData.types.find(t => t === lists[i].name);
            // if (!productHasType) {
                l0 = {...lists[i]};
                typesToSelect.push({value: l0.url, label: l0.name});
            // }
        }
    }

    return (
        <div className={s.list_select_div} >
            <Select isMulti options={typesToSelect} onChange={(value) => setChosenLists(value)} />
            <button className={s.btn} disabled={chosenLists.length <= 0} onClick={() => handleSelectSubmit()}>Add to lists:</button>
        </div>
    );
}

export default ListsSelect;