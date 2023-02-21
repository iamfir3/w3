import actionTypes from "../actions/actionTypes";

const initState = {
    userId: '',
    tokenChangePassword: '',
    tokenVerifyEmailSuccess: '',
}

const changePasswordReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_USERID_TOKEN:
            console.log(action);
            return { ...state, userId: action.data.userId, tokenChangePassword: action.data.tokenChangePassword };
        case actionTypes.SAVE_TOKEN_VERIFY_EMAIL:
            return { ...state, tokenVerifyEmailSuccess: action.data }
        default:
            return state;
    }
}

export default changePasswordReducer;