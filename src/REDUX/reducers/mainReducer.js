import {checkAuth} from "./adminReducer";
import {getProducts} from "./productsReducer";
import {getLists} from "./listsReducer";
import {getSlides} from "./sliderReducer";

const SET_INITIALIZED_SUCCESS = "mainReducer/SET_INITIALIZED_SUCCESS";
const SET_ITEMS_IDS_ARRAY = "mainReducer/SET_ITEMS_IDS_ARRAY";

let initialState = {
    initialized: false,
    links: [
        {url: '/', name: "Main"},
        {url: '/info', name: "Info"},
        {url: '/order', name: "ORDER"},
        {url: '/admin', name: "admin"},
    ],
    itemsIdsArr: [],
    apiURL: "http://192.168.1.162:7500",
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        case SET_ITEMS_IDS_ARRAY:
            return {
                ...state,
                itemsIdsArr: action.idsArr,
            }

        default:
            return state;
    }
};

const setInitializedSuccessAC = () => ({type: SET_INITIALIZED_SUCCESS});
export const setItemsIdsArrAC = (idsArr) => ({type: SET_ITEMS_IDS_ARRAY, idsArr});

//=====THUNKS=======

export const initApp = (page, limit) =>
    async (dispatch) => {
        try {
            await Promise.all([dispatch(checkAuth()), dispatch(getSlides()), dispatch(getProducts(page, limit)), dispatch(getLists())]);
    } catch (e) {
        //console.log(e);
    }
        dispatch(setInitializedSuccessAC());
        //setTimeout(()=> dispatch(setInitializedSuccessAC()), 500);   //  promise
    }

export default mainReducer;