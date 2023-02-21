import actionTypes from "../actions/actionTypes";

const initState = {
    showHomenav: true,
}

const homenavReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_HOMENAV:
            return { ...state, showHomenav: true }
            case actionTypes.HIDDEN_HOMENAV: 
            return{...state, showHomenav:false }
        default:
            return state;
    }
}

export default homenavReducer;