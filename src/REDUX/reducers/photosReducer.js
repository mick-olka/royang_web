import {photosAPI} from "../../API/api";
import {getProductById} from "./productsReducer";

//const SET_THUMBNAIL = "photosReducer/SET_THUMBNAIL"
const SET_GALLERY = "photosReducer/SET_GALLERY";
const SET_COLORS = "photosReducer/SET_COLORS";

let initialState = {
    //thumbnail: null,
    gallery: [],
    colors: [],
}

const photosReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_GALLERY:
            return {
                ...state, gallery: action.gallery
            }
        case SET_COLORS:
            return {
                ...state, colors: action.colors
            }
        default:
            return state;
    }
}

//====================================

const setGalleryAC = (gallery) => ({type: SET_GALLERY, gallery});
const setColorsAC = (colors) => ({type: SET_COLORS, colors});

export const getGallery = () => async (dispatch) => {
    try {
        let res = await photosAPI.getGallery();
        dispatch(setGalleryAC(res));
    } catch (e) {
        alert("get_gallery: "+e);
    }
}

export const getColors = () => async (dispatch) => {
    try {
        let res = await photosAPI.getColors();
        dispatch(setColorsAC(res));
    } catch (e) {
        console.log("get_colors: "+e);
    }
}

export const uploadThumbnail = (id, thumbnail) => async (dispatch) => {
    try {
            let res = await photosAPI.setThumbnail(id, thumbnail);
            if (res.code === 0) {
                //
            }
    } catch (e) {
        alert("setThumbnail: "+e);
    }
}

export const addPhotos = (id, files, mainColor, pillColor) => async (dispatch) => {
    try {
        let res = await photosAPI.addPhotos(id, files, mainColor, pillColor);
        if (res.code === 0) {
            dispatch(getProductById(id));
        }
    } catch (e) {
        alert("addPhotos: "+e);
    }
}

export const deletePhotos = (prodId, photosId) => async (dispatch) => {
    try {
            let res = await photosAPI.deletePhotos(prodId, photosId);
            if (res.code === 0) {
                //console.log('deleted');
            }
            dispatch(getProductById(prodId));
    } catch (e) {
        alert("deletePhotos: "+e);
    }
}

export default photosReducer;