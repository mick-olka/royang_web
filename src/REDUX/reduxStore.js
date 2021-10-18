import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import mainReducer from "./reducers/mainReducer";
import thunkMiddleware from "redux-thunk";
import adminReducer from "./reducers/adminReducer";
import productsReducer from "./reducers/productsReducer";
import photosReducer from "./reducers/photosReducer";
import listsReducer from "./reducers/listsReducer";
import paginatorReducer from "./reducers/paginatorReducer";
import cartReducer from "./reducers/cartReducer";
import sliderReducer from "./reducers/sliderReducer";

let reducers = combineReducers({
    mainReducer: mainReducer,
    productsReducer: productsReducer,
    photosReducer: photosReducer,
    listsReducer: listsReducer,
    admin: adminReducer,
    paginatorReducer: paginatorReducer,
    cartReducer: cartReducer,
    sliderReducer: sliderReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;   //  FOR BROWSER EXTENSION

const store = createStore(reducers, /*preloadedState,*/ composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;