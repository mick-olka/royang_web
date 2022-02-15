import {productsAPI} from "../../API/api";
import {uploadThumbnail} from "./photosReducer";
import {setTotalItemsCountAC} from "./paginatorReducer";
import global_data from "../global_data";

const SET_PRODUCTS = "productsReducer/SET_PRODUCTS";
const SET_PRODUCT_FORM = "productsReducer/SET_PRODUCT_FORM";
const SET_IS_LOADING = "productsReducer/SET_IS_LOADING";
const SET_ID_OF_CREATED = "productsReducer/SET_ID_OF_CREATED";
const SET_FOUND_PRODUCTS = "productsReducer/SET_FOUND_PRODUCTS";
const SET_CHOSEN_PRODUCT = "productsReducer/SET_CHOSEN_PRODUCT";

let initialState = {
    products: [],
    chosenItemsIds: [],
    chosenProduct: null,
    productsFound: [],
    idOfCreated: null,
    productData: {
        _id: null,
        thumbnail: "",
        oldPrice: 0,
        images: [],
        types: [],
        index: 0,
    },
    isLoading: true,
}

const prodLim = global_data.page_limit;

const productsReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state, products: [...action.products]
            }

        case SET_PRODUCT_FORM:
            return {
                ...state, productData: {...state.productData, ...action.product},
            }

        case SET_IS_LOADING:
            return {
                ...state, isLoading: action.isLoading,
            }

        case SET_ID_OF_CREATED:
            return {
                ...state, idOfCreated: action.id,
            }

        case SET_FOUND_PRODUCTS:
            return {
                ...state, productsFound: [...action.products],
            }

        case SET_CHOSEN_PRODUCT:
            return {
                ...state, chosenProduct: action.data,
            }

        default:
            return state;
    }
}

const setProductsAC = (products) => ({type: SET_PRODUCTS, products});
export const setProductFormAC = (product) => ({type: SET_PRODUCT_FORM, product});
const setIsLoadingAC = (isLoading) => ({type: SET_IS_LOADING, isLoading});
export const setIdOfCreatedAC = (id) => ({type: SET_ID_OF_CREATED, id});
const setProductsFoundAC = (products) => ({type: SET_FOUND_PRODUCTS, products});
export const setChosenProductAC = (data) => ({type: SET_CHOSEN_PRODUCT, data}); //  {prodId, name}  for related choose

//====================================

export const getProducts = (page, limit=prodLim) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true));
        let response = await productsAPI.getProducts(page, limit);
        dispatch(setProductsAC(response.products));
        dispatch(setTotalItemsCountAC(response.count));
    } catch (e) {

    }
    dispatch(setIsLoadingAC(false));
}

export const getProductById = (id) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true));
        let response = await productsAPI.getProductById(id);
        await dispatch(setProductFormAC(response));
    } catch (e) {

    }
    dispatch(setIsLoadingAC(false));
}

export const createProduct = (formData, thumbnail) =>
    async (dispatch) => {
        try {
            let res = await productsAPI.createProduct(formData);
            if (res.code === 0) {
                if (thumbnail) await dispatch(uploadThumbnail(res.result._id, thumbnail));
                dispatch(setProductFormAC({
                    _id: null,
                    thumbnail: "",
                    oldPrice: 0,
                    images: [],
                    types: [],
                }));
                dispatch(setIdOfCreatedAC(res.result._id));
                dispatch(getProducts());
            }
        } catch (e) {
            alert("createProduct: "+e);
        }
    }

export const updateProduct = (id, formData, thumbnail) =>
    async (dispatch) => {
        try {
            let res = await productsAPI.updateProduct(id, formData);
            if (res.code === 0) {
                if (thumbnail) await dispatch(uploadThumbnail(id, thumbnail));
                dispatch(setProductFormAC(formData));
                dispatch(getProductById(id));
                dispatch(getProducts());
            }
        } catch (e) {
            alert("updateProduct: "+e);
        }
    }

    export const deleteProducts = (idArr) => async (dispatch) => {
        try {
            for (let i=0; i<idArr.length; i++) {
                let res = await productsAPI.deleteProduct(idArr[i]);
                if (res.code === 0) {
                    //console.log('deleted');
                }
            }
            dispatch(getProducts());
        } catch (e) {
            alert("deleteProduct: "+e);
        }
    }

export const findProducts = (str, page, limit=prodLim) => async (dispatch) => {
    try {
        let response = await productsAPI.findProducts(str, page, limit);
        dispatch(setProductsFoundAC(response.result));
        dispatch(setTotalItemsCountAC(response.count));
    } catch (e) {
        alert("findProducts: "+e);
    }
}

export default productsReducer;