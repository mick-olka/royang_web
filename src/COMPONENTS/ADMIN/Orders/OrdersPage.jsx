import React from 'react';
import ItemsListC from "../ItemsList/ItemsListC";
import PaginatorC from "../../Extra/Paginator/PaginatorC";
import OrderItem from "./OrderItem";

function OrdersPage({ orders, setCurrentPageAC, getOrders, deleteOrders }) {

    const onOrderDelete = (idArr) => {
        deleteOrders(idArr);
    }

    const onPageChanged = (pageNumber) => {
        setCurrentPageAC(pageNumber);
        getOrders(pageNumber);
    }

    return (
        <div>
            <h2>ORDERS</h2>

            <ItemsListC items={orders} deleteItems={onOrderDelete} >
                {item => <OrderItem item={item}/>}
            </ItemsListC>

            <PaginatorC onPageChanged={onPageChanged} />

        </div>
    );
}

export default OrdersPage;