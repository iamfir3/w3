import actionTypes from "./actionTypes";

export const setSearchKeyword=(keyword)=>{
    return {
        type: actionTypes.SET_SEARCH_KEYWORD,
        data:keyword,
    }
}

