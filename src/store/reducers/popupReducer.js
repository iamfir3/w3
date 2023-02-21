import actionTypes from "../actions/actionTypes";

const initState = {
    showPopup: false,
}

const popupReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_POPUP:
            return { ...state, showPopup: action.data }
        default:
            return state;
    }
}

export default popupReducer;