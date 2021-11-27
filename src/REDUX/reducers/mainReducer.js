import {checkAuth} from "./adminReducer";
import {getProducts} from "./productsReducer";
import {getLists} from "./listsReducer";
import {getSlides} from "./sliderReducer";
import {getAllText} from "./textReducer";
import {getColors} from "./photosReducer";
import {addItemToCart} from "./cartReducer";

const SET_INITIALIZED_SUCCESS = "mainReducer/SET_INITIALIZED_SUCCESS";
const SET_ITEMS_IDS_ARRAY = "mainReducer/SET_ITEMS_IDS_ARRAY";
const SET_ERROR = "mainReducer/SET_ERROR";

let initialState = {
    initialized: false,
    links: [
        {url: '/gallery', name: "Галерея Фото"},
        {url: '/colors', name: "Вибір Кольору"},
        {url: '/info#delivery', name: "Про Доставку"},
        {url: '/info#contacts', name: "Контакти"},
        {url: '/info#discounts', name: "Знижки"},
        {url: '/info#plastic_rotang', name: "Про Полі-Ротанг"},
        {url: '/info#rotang', name: "Про Ротанг"},
        {url: '/info#payment', name: "Оплата"},
    ],
    itemsIdsArr: [],
    apiURL: "http://192.168.1.162:7500",
    error: null,
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

        case SET_ERROR:
            return {
                ...state, error: action.error_text,
            }

        default:
            return state;
    }
};

const setInitializedSuccessAC = () => ({type: SET_INITIALIZED_SUCCESS});
export const setItemsIdsArrAC = (idsArr) => ({type: SET_ITEMS_IDS_ARRAY, idsArr});
export const setErrorAC = (error_text) => ({type: SET_ERROR, error_text});

//=====THUNKS=======

export const initApp = (page, limit) =>
    async (dispatch) => {
        try {
            if (localStorage.cart) {    //  download from storage
                let cart = JSON.parse(localStorage.cart);
                cart.map(i => {
                    return dispatch(addItemToCart(i));
                });
            }
            await Promise.all([dispatch(checkAuth()), dispatch(getSlides()),
                dispatch(getProducts(page, limit)), dispatch(getLists()), dispatch(getAllText()), dispatch(getColors())]);
    } catch (e) {
        console.log(e);
        dispatch(setErrorAC("Initialization Error"));
        }
        dispatch(setInitializedSuccessAC());
    }

export default mainReducer;