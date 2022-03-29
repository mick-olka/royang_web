import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import s from "./ListSelect.module.css";

function ListsSelect({lists, addElement, deleteElement, prodIdArr, types}) {
    //  types -- already chosen, lists -- available
    let [chosenLists, setChosenLists] = useState([]);   //  new chosen lists
    useEffect(()=>{
        let typesValues = types.map(t=>{
            return {label: t.name, value: t.url};
        });
        setChosenLists(typesValues)
    }, [types]);
    const handleSelectSubmit = () => {
        let prev_lists = types.map(t=>{
            return t.url;
        });
        let chosen_lists = chosenLists.map(l => {
            return l.value;
        });
        for (let i=0; i<prodIdArr.length; i++) {
            addElement(chosen_lists, prodIdArr[i]);
        }
        let urls_to_del = prev_lists.filter(x => !chosen_lists.includes(x));
        console.log(urls_to_del);
        for (let i=0; i<urls_to_del.length; i++) {
            deleteElement(urls_to_del[i], prodIdArr);
        }
        setChosenLists([]);
    }

    let typesToSelect = [];
    let defaultTypes = [];
    let l0;
    if (lists) {
        for (let i=0; i<lists.length; i++) {
            l0 = {...lists[i]};
            typesToSelect.push({value: l0.url, label: l0.name['ua']});
        }
    }
    if (types) {
        for (let t=0; t<types.length; t++) {
            l0= {...types[t]};
            defaultTypes.push({value: l0.url, label: l0.name['ua']})
        }
    }

    return (
        <div className={s.list_select_div} >
            <button className={s.btn}
                //disabled={chosenLists.length <= 0}
                    onClick={() => handleSelectSubmit()}>Add to lists:</button>
            <Select isMulti
                    options={typesToSelect} defaultValue={defaultTypes}
                    onChange={(value) => setChosenLists(value)} />
        </div>
    );
}

export default ListsSelect;