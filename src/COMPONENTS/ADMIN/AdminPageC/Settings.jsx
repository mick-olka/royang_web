import React from 'react';
import ChangePW from "../AuthAdmin/ChangePW";
import {makeBackup, restoreBackup} from "../../../REDUX/reducers/adminReducer";

function Settings ({changePW}) {

    return (
        <div>
            Settings
            <ChangePW />
            <button onClick={makeBackup} >Make Backup</button>
            <button onClick={restoreBackup} >Restore Backup</button>
        </div>
    );
}

export default Settings;