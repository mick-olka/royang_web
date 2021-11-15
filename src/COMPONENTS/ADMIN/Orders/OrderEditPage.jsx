import React from 'react';
import OrderEditForm from "./OrderEditForm";

function OrderEditPage({orderId, orderData, updateOrder}) {
    console.log(orderData);

    const onSubmit = (formData) => {
        updateOrder(orderId, formData);
    }

    let orderFormValues = {...orderData};

    return (
        <div>
            <h2>Order {orderId}</h2>
            <OrderEditForm initialValues={orderFormValues} onSubmit={onSubmit} />
        </div>
    );
}

export default OrderEditPage;