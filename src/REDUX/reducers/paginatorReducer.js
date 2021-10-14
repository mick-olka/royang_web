
const SET_PORTION_NUM = "productsReducer/SET_PORTION_NUM";
const SET_CURRENT_PAGE = "productsReducer/SET_CURRENT_PAGE";
const SET_TOTAL_ITEMS_COUNT = "productsReducer/SET_TOTAL_ITEMS_COUNT";

let initialState = {
        totalItemsCount: 0,
        currentPage: 1,
        portionNum: 1,
        portionSize: 2,
        pageLimit: 2,
}

const paginatorReducer = (state=initialState, action) => {
    switch (action.type) {

        case SET_PORTION_NUM:
            return {
                ...state, portionNum: action.portionNum,
            }

        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage,
            }

        case SET_TOTAL_ITEMS_COUNT:
            return {
                ...state, totalItemsCount: action.count,
            }

        default:
            return state;
    }
}

export const setPortionNumAC = (portionNum) => ({type: SET_PORTION_NUM, portionNum});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalItemsCountAC = (count) => ({type: SET_TOTAL_ITEMS_COUNT, count});

//====================================

export default paginatorReducer;