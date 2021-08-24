import {productsAPI} from "../../API/api";
import {uploadThumbnail} from "./photosReducer";

const SET_PRODUCTS = "productsReducer/SET_PRODUCTS";
const SET_PRODUCT_FORM = "productsReducer/SET_PRODUCT_FORM";
const SET_IS_LOADING = "productsReducer/SET_IS_LOADING";
const SET_ID_OF_CREATED = "productsReducer/SET_ID_OF_CREATED";
const SET_NEW_ERROR = "productsReducer/SET_HAS_ERROR";

let initialState = {
    products: [],
    newError: null,
    idOfCreated: "",
    productData: {
        _id: null,
        thumbnail: "",
        images: [],
        types: [],
    },
    isLoading: true,
}

const productsReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state, products: [...action.products]
            }

        case SET_PRODUCT_FORM:
            return {
                ...state, productData: action.product,
            }

        case SET_IS_LOADING:
            return {
                ...state, isLoading: action.isLoading,
            }

        case SET_ID_OF_CREATED:
            return {
                ...state, idOfCreated: action.id,
            }

        case SET_NEW_ERROR:
            return {
                ...state, newError: action.error,
            }

        default:
            return state;
    }
}

const setProductsAC = (products) => ({type: SET_PRODUCTS, products});
export const setProductFormAC = (product) => ({type: SET_PRODUCT_FORM, product});
const setIsLoadingAC = (isLoading) => ({type: SET_IS_LOADING, isLoading});
const setIdOfCreatedAC = (id) => ({type: SET_ID_OF_CREATED, id});
const setNewErrorAC = (error) => ({type: SET_NEW_ERROR, error});

//====================================

export const getProducts = () => async (dispatch) => {
    dispatch(setIsLoadingAC(true));
    let response = await productsAPI.getProducts();
    dispatch(setProductsAC(response.products));
    dispatch(setIsLoadingAC(false));
}

export const getProductById = (id) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true));
        let response = await productsAPI.getProductById(id);
        await dispatch(setProductFormAC(response));
        dispatch(setIsLoadingAC(false));
        dispatch(setNewErrorAC(null));
    } catch (e) {
        //alert("getProductById: "+e.message);
        dispatch(setNewErrorAC(e.message));
        dispatch(setIsLoadingAC(false));
    }
}

export const createProduct = (formData, thumbnail) =>
    async (dispatch) => {
        try {
            let res = await productsAPI.createProduct(formData);
            if (res.code === 0) {
                if (thumbnail) await dispatch(uploadThumbnail(res.result._id, thumbnail));
                //dispatch(getProductById(res.result._id));
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

export default productsReducer;