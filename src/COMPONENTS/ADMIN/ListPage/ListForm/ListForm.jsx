import React from 'react';
import {Formik, Form, Field} from 'formik';
import s from "./ListForm.module.css";

const ListForm = (props) => {

    let initialValues = {
        name: '',
        url: props.listUrl ? props.listUrl: "",
    };

    if (props.listUrl) initialValues.name=props.initData.name;

    return <div className={s.list_form_div} >
        <Formik initialValues={initialValues} onSubmit={(values, {resetForm}) => {
            props.onSubmit(values);
            resetForm();
        }}>
            {({values}) => (
                <Form>
                    <div className={s.input_div} >
                        <label htmlFor="name">Name: </label>
                        <Field name="name" />
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="url">URL: </label>
                        <Field name="url"/>
                    </div>
                    <button type="submit">Create List</button>
                </Form>
            )}
        </Formik>
    </div>
};

export default ListForm;