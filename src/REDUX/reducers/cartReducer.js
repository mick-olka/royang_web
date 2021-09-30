import {orderApi, productsAPI} from "../../API/api";
import {setTotalProductsCountAC} from "./paginatorReducer";
import {setProductFormAC} from "./productsReducer";

const ADD_ITEM_TO_CART = "cartReducer/ADD_ITEM_TO_CART";
const SET_SUMMARY = "cartReducer/SET_SUMMARY";
const ADD_TO_SUMMARY = "cartReducer/ADD_TO_SUMMARY";
const SET_IS_LOADING = "cartReducer/SET_IS_LOADING";
const SET_ORDERS = "cartReducer/SET_ORDERS";
const SET_NEW_ERROR = "cartReducer/SET_NEW_ERROR";

let initialState = {
    isLoading: true,
    cart: [],
    summary: 0,
    orders: [],
    newError: null,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_ITEM_TO_CART:
            let newItem = {
                prodId: action.item.prodId,
                name: action.item.name,
                code: action.item.code,
                mainColor: action.item.mainColor,
                pillColor: action.item.pillColor,
                count: action.item.count,
                sum: action.item.sum,
            }
            return {
                ...state,
                cart: [...state.cart, newItem],
            }

        case SET_SUMMARY:
            return {...state, summary: action.sum}

        case ADD_TO_SUMMARY:
            return {...state, summary: state.summary+action.sum}

        default:
            return state;
    }
};

const addItemToCartAC = (item) => ({type: ADD_ITEM_TO_CART, item});
const setSummaryAC = (sum) => ({type: ADD_ITEM_TO_CART, sum});
const addToSummaryAC = (sum) => ({type: ADD_TO_SUMMARY, sum});
const setIsLoadingAC = (isLoading) => ({type: SET_IS_LOADING, isLoading});
const setOrdersAC = (orders) => ({type: SET_ORDERS, orders});
const setNewErrorAC = (error) => ({type: SET_NEW_ERROR, error});

//=====THUNKS=======

export const addItemToCart = (item) =>
    async (dispatch) => {
        dispatch(addToSummaryAC(item.sum));
        dispatch(addItemToCartAC(item));
        try {
            //await Promise.all([dispatch(checkAuth()), dispatch(getProducts(page, limit)), dispatch(getLists())]);
    } catch (e) {
        //console.log(e);
    }
        //dispatch(setInitializedSuccessAC());
        //setTimeout(()=> dispatch(setInitializedSuccessAC()), 500);   //  promise
    }

export const getOrders = (page, limit) => async (dispatch) => {
    dispatch(setIsLoadingAC(true));
    let response = await orderApi.getOrders(page, limit);
    dispatch(setOrdersAC(response.products));
    dispatch(setTotalProductsCountAC(response.count));
    dispatch(setIsLoadingAC(false));
}

export const getOrderById = (id) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true));
        let response = await orderApi.getOrderById(id);
        await dispatch(setProductFormAC(response));
        dispatch(setIsLoadingAC(false));
        dispatch(setNewErrorAC(null));
    } catch (e) {
        //alert("getProductById: "+e.message);
        dispatch(setNewErrorAC(e.message));
        dispatch(setIsLoadingAC(false));
    }
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
            let res = await productsAPI.updateProduct(id, formData);
            if (res.code === 0) {
                dispatch(getOrderById(id));
                dispatch(getOrders());
            }
        } catch (e) {
            alert("updateOrder: "+e);
        }
    }

export const deleteOrder = (idArr) => async (dispatch) => {
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