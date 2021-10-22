import {checkAuth} from "./adminReducer";
import {getProducts} from "./productsReducer";
import {getLists} from "./listsReducer";
import {getSlides} from "./sliderReducer";
import {getAllText} from "./textReducer";

const SET_INITIALIZED_SUCCESS = "mainReducer/SET_INITIALIZED_SUCCESS";
const SET_ITEMS_IDS_ARRAY = "mainReducer/SET_ITEMS_IDS_ARRAY";

let initialState = {
    initialized: false,
    links: [
        {url: '/info#plastic_rotang', name: "Про Полі-Ротанг"},
        {url: '/info#rotang', name: "Про Ротанг"},
        {url: '/info#delivery', name: "Про Доставку"},
        {url: '/order', name: "Корзина"},
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
            await Promise.all([dispatch(checkAuth()), dispatch(getSlides()),
                dispatch(getProducts(page, limit)), dispatch(getLists()), dispatch(getAllText())]);
    } catch (e) {
        //console.log(e);
    }
        dispatch(setInitializedSuccessAC());
        //setTimeout(()=> dispatch(setInitializedSuccessAC()), 500);   //  promise
    }

export default mainReducer;