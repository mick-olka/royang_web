import React from 'react';
import {Formik, Form, Field} from 'formik';

const TypeForm = (props) => {

    let initialValues = {
        name: '',
        url: ''
    };

    if (props.listUrl) initialValues=props.initData;

    return <div>
        <Formik initialValues={initialValues} onSubmit={(values, {resetForm}) => {
            props.onSubmit(values);
            resetForm();
        }}>
            {({values}) => (
                <Form>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <Field name="name"/>
                    </div>
                    <div>
                        <label htmlFor="url">URL: </label>
                        <Field name="url"/>
                    </div>
                    <button type="submit">Create List</button>
                </Form>
            )}
        </Formik>
    </div>
};

export default TypeForm;