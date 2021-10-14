//import {createSelector} from "reselect";

// export const getOrders = (state) => {
//     return state.cartReducer.orders;
// }

export const getAdminOrdersPageProps = (state) => {
    return {
        orders: state.cartReducer.orders,
        isLoading: state.cartReducer.isLoading,
    };
}
