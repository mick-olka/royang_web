import React, {useState} from 'react';
import ChangePwForm from "./PasswordForms/ChangePwForm";
import {Redirect} from "react-router-dom";

function ChangePW ({changePW}) {

    let [isDone, setIsDone] = useState(false);

    const onSubmit = (formData) => {
        changePW(formData.password, formData.oldPassword);
        setIsDone(true);
    }

    // if (isAdmin) {
    //     return <Redirect to={'/admin'} />
    // }

    return (
        <div>
            {isDone? <Redirect to="/admin/login" />:<ChangePwForm onSubmit={onSubmit} />}
        </div>
    );
}

export default ChangePW;