import {orderApi} from "../../API/api";
import {setTotalItemsCountAC} from "./paginatorReducer";

const ADD_ITEM_TO_CART = "cartReducer/ADD_ITEM_TO_CART";
const COUNT_SUMMARY = "cartReducer/COUNT_SUMMARY";
const SET_IS_LOADING = "cartReducer/SET_IS_LOADING";
const SET_ORDERS = "cartReducer/SET_ORDERS";
const DELETE_ITEM = "cartReducer/DELETE_ITEM";
const SET_INDEXES = "cartReducer/SET_INDEXES";
const SET_ORDER_DATA = "cartReducer/SET_ORDER_DATA";
const UPDATE_ITEM_COUNT = "cartReducer/UPDATE_ITEM_COUNT";

let initialState = {
    isLoading: true,    //  for ADMIN
    cart: [],   //  for client
    sum: 0,
    orders: [], //  for ADMIN page
    orderData: {
        _id: null,
    },
    newError: null,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ORDERS:
            return {...state, orders: [...action.orders]}

        case ADD_ITEM_TO_CART:
             // state.cart.map(i=>
             //        if (i.code === action.item.code) return {...i, count: parseInt(i.count+action.item.count)} : {...i}
             //    );
            for (let i=0; i<state.cart.length; i++) {
                if (state.cart[i].code===action.item.code) {
                    state.cart[i].count+=parseInt(action.item.count);
                    state.cart[i].mainColor=action.item.mainColor;
                    state.cart[i].pillColor=action.item.pillColor;
                    return {...state, cart: [...state.cart]}
                }
            }
            let newItem = {
                product: action.item.product,
                name: action.item.name,
                code: action.item.code,
                photo: action.item.photo,
                mainColor: action.item.mainColor,
                pillColor: action.item.pillColor,
                count: action.item.count,
                price: action.item.price,
            }
            return {
                ...state,
                cart: [...state.cart, newItem],
            }

        case DELETE_ITEM:
            let cartCopy = [...state.cart];
            cartCopy.splice(action.index, 1);
            console.log(action.index);
            return {...state, cart: cartCopy}

        case SET_INDEXES:
            let cartCopy0 = [...state.cart];
            for (let i=0; i<cartCopy0.length; i++) {
                cartCopy0[i]={...cartCopy0[i], index: i}
            }
            return {...state, cart: cartCopy0}

        case COUNT_SUMMARY:
            let sum=0;
            for (let i=0; i<state.cart.length; i++) {
                sum+=(state.cart[i].price*state.cart[i].count);
            }
            return {...state, sum: sum}

        case SET_ORDER_DATA:
            return { ...state, orderData: action.orderData }

        case UPDATE_ITEM_COUNT:
            return {...state, cart: state.cart.map(i=>
                    i.index === action.index ? {...i, count: parseInt(action.count)||0} : {...i}
                )}



        default:
            return state;
    }
};

const addItemToCartAC = (item) => ({type: ADD_ITEM_TO_CART, item});
const removeItemByIndexAC = (index) => ({type: DELETE_ITEM, index});
const countSummaryAC = () => ({type: COUNT_SUMMARY});
const setIsLoadingAC = (isLoading) => ({type: SET_IS_LOADING, isLoading});
const setOrdersAC = (orders) => ({type: SET_ORDERS, orders});
const setIndexesAC = () => ({type: SET_INDEXES});
const setOrderDataAC = (orderData) => ({ type: SET_ORDER_DATA, orderData });
const updateItemCountAC = (index, count) => ({ type: UPDATE_ITEM_COUNT, index, count });

//=====THUNKS=======

export const updateItemCount = (index, count) =>
    async (dispatch) => {
    if (count<0) count=0;
        dispatch(updateItemCountAC(index, count));
        dispatch(countSummaryAC());
    }

export const addItemToCart = (item) =>
    async (dispatch) => {
        dispatch(addItemToCartAC(item));
        dispatch(countSummaryAC());
        dispatch(setIndexesAC());
    }

export const deleteItemByIndex = (index) =>
    async (dispatch) => {
        dispatch(removeItemByIndexAC(index));
        dispatch(countSummaryAC());
        dispatch(setIndexesAC());
    }

export const getOrders = (page, limit) => async (dispatch) => {
    dispatch(setIsLoadingAC(true));
    let response = await orderApi.getOrders(page, limit);
    dispatch(setOrdersAC(response.orders));
    dispatch(setTotalItemsCountAC(response.count));
    dispatch(setIsLoadingAC(false));
}

export const getOrderById = (id) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true));
        let response = await orderApi.getOrderById(id);
        await dispatch(setOrderDataAC(response));
    } catch (e) {

    }
    dispatch(setIsLoadingAC(false));
}

export const createOrder = (formData) =>
    async (dispatch) => {
        try {
            let res = await orderApi.createOrder(formData);
            if (res.code === 0) {
                dispatch(getOrders);
            }
        } catch (e) {
            alert("createOrder: "+e);
        }
    }

export const updateOrder = (id, formData) =>
    async (dispatch) => {
        try {
            let res = await orderApi.updateOrder(id, formData);
            if (res.code === 0) {
                dispatch(getOrderById(id));
                dispatch(getOrders());
            }
        } catch (e) {
            alert("updateOrder: "+e);
        }
    }

export const deleteOrders = (idArr) => async (dispatch) => {
    try {
        for (let i=0; i<idArr.length; i++) {
            let res = await orderApi.deleteOrder(idArr[i]);
            if (res.code === 0) {
                //console.log('deleted');
            }
        }
        dispatch(getOrders());
    } catch (e) {
        alert("deleteOrder: "+e);
    }
}

export default cartReducer;