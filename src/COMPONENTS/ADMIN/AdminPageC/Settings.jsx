import React from 'react';
import ChangePW from "../AuthAdmin/ChangePW";
import {
    makeBackup,
    restoreBackup
} from "../../../REDUX/reducers/adminReducer";
import {apiURL} from "../../../API/api";
const download_db_link = apiURL + 'download_archive_db';
const download_photos_link = apiURL + 'download_archive_photos';

function Settings ({changePW}) {
    return (
        <div>
            Settings
            <ChangePW changePW={changePW} />
            <button onClick={makeBackup} >Make Backup</button>
            <button onClick={restoreBackup} >Restore Backup</button>
            <button ><a href={download_db_link}> Download Database Archive</a></button>
            <button ><a href={download_photos_link}> Download Photos Archive</a></button>
        </div>
    );
}

export default Settings;