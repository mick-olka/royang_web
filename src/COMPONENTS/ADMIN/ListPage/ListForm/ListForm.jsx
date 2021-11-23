import React from 'react';
import {Formik, Form, Field} from 'formik';
import s from "./ListForm.module.css";

const ListForm = (props) => {

    let initialValues = {
        name: '',
        url: props.listUrl ? props.listUrl: "",
        index: 0,
    };

    if (props.listUrl) {
        initialValues.name=props.initData.name;
        initialValues.index=props.initData.index;
    };

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
                    <div className={s.input_div} >
                        <label htmlFor="index">Index: </label>
                        <Field type="number" name="index"/>
                    </div>
                    <button style={{width: "100%", fontSize: "1.5rem"}} type="submit">SAVE</button>
                </Form>
            )}
        </Formik>
    </div>
};

export default ListForm;