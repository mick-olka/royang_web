import React from 'react';
import PasswordForm from "./PasswordForms/PasswordForm";
import {Redirect} from "react-router-dom";
import s from "./AdminAuth.module.css";

function AdminAuth ({authAdmin, isAdmin}) {

    const onSubmit = (formData) => {
        authAdmin(formData.password);
    }

    if (isAdmin) {
        return <Redirect to={'/admin'} />
    }

    return (
        <div className={s.container} >
            <h2 className={s.header} >Admin Auth</h2>
            <PasswordForm onSubmit={onSubmit} />
        </div>
    );
}

export default AdminAuth;