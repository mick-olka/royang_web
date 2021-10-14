import React from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';

const OrderEditForm = ({initialValues, onSubmit }) => {

    return <div>
        <Formik initialValues={initialValues} onSubmit={values => {
            onSubmit(values)
            //console.log(values)
        }}>
            {({values}) => (
                <Form>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <Field name="name"/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone: </label>
                        <Field name="phone"/>
                    </div>
                    <div>
                        <label htmlFor="sum">Sum: </label>
                        <Field type="number" name="sum"/>
                    </div>
                    <div>
                        <label htmlFor="message">Message: </label>
                        <Field name="message"/>
                    </div>

                    <FieldArray
                        name="cart"
                        render={arrayHelpers => (
                            <div>
                                {values.cart.map(({item}, index) => (
                                        <div key={index}>
                                            <label htmlFor="prodItem">{`cart.${index}.product.name`}</label>
                                            <Field name={`cart.${index}.mainColor`}/>
                                            <Field name={`cart.${index}.pillColor`}/>
                                            <Field type="number" name={`cart.${index}.count`}/>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            >-
                                            </button>

                                        </div>
                                    ))}
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        )}
                    />
                </Form>
            )}
        </Formik>
    </div>
};

export default OrderEditForm;