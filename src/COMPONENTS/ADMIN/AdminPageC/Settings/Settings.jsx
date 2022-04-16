import React, {useState} from 'react';
import ChangePW from "../../AuthAdmin/ChangePW";
import {
    makeBackup,
    restoreBackup
} from "../../../../REDUX/reducers/adminReducer";
import s from "./Settings.module.css";
import {apiURL} from "../../../../API/api";
import ListForm from "../../ListPage/ListForm/ListForm";
const download_db_link = apiURL + 'download_archive_db';
const download_photos_link = apiURL + 'download_archive_photos';

function Settings ({changePW, createList, pushToHistory}) {
    const onSubmit = async (formData) => {    //  Create List
        await createList(formData);
        pushToHistory('/admin/lists/'+formData.url);
    }
    const [showListForm, setShowListForm] = useState(false);

    return (
        <div className={s.pane} >
            <h2> Settings</h2>
            <h3>Backup Data</h3>
            <div className={s.backup_pane} >
                <button onClick={makeBackup} >Make Backup</button>
                <button onClick={restoreBackup} >Restore Backup</button>
                <button ><a href={download_db_link}> Download Database Archive</a></button>
                <button ><a href={download_photos_link}> Download Photos Archive</a></button>
            </div>
            <hr/>
            <h3 style={{textDecoration: 'underline'}} onClick={()=>setShowListForm(!showListForm)} >Create new list {showListForm ? '△':'▽'}</h3>
            <div style={showListForm ? {display: 'block'}:{display: 'none'}} >
                <ListForm onSubmit={onSubmit}/>
            </div>
            <br/>
            <hr/>
            <h3>Change password</h3>
            <ChangePW changePW={changePW} />
        </div>
    );
}

export default Settings;