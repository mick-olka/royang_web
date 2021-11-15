import React from 'react';
import {useFormik} from "formik";

function ChangePwForm({onSubmit, error}) {

    const formik = useFormik({
        initialValues: {
            password: '',
            repeatPW: '',
            oldPassword: '',
        },
        onSubmit: values => {
            if (values.password===values.repeatPW) onSubmit(values);
            else alert("Different new password!");
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="oldPassword">Old pw</label>
            <input
                id="oldPassword"
                name="oldPassword"
                type="oldPassword"
                onChange={formik.handleChange}
                value={formik.values.oldPassword}
            />
            <label htmlFor="password">New pw</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <label htmlFor="password">Repeat pw</label>
            <input
                id="repeatPW"
                name="repeatPW"
                type="repeatPW"
                onChange={formik.handleChange}
                value={formik.values.repeatPW}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default ChangePwForm;

// const ReduxAdminAuthForm = reduxForm({form: 'adminLogin'})(PasswordForm);

// export default ReduxAdminAuthForm;