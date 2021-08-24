import React from 'react';
import PasswordForm from "./PasswordForms/PasswordForm";
import {Redirect} from "react-router-dom";

function AdminAuth ({authAdmin, isAdmin}) {

    const onSubmit = (formData) => {
        authAdmin(formData.password);
    }

    if (isAdmin) {
        return <Redirect to={'/admin'} />
    }

    return (
        <div>
            Admin Auth
            <PasswordForm onSubmit={onSubmit} />
        </div>
    );
}

export default AdminAuth;