import React from 'react';
import {useFormik} from "formik";

function PasswordForm({onSubmit, error}) {

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: values => {onSubmit(values)},
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="password">Admin key</label>
            <input
                id="password"
                name="password"
                type="password"
                autoFocus={true}
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default PasswordForm;

// const ReduxAdminAuthForm = reduxForm({form: 'adminLogin'})(PasswordForm);

// export default ReduxAdminAuthForm;