import actionTypes from "./actionTypes";
import changePassword from "../../apis/changePassword";

export const saveUseridToken = (data) => {
    return {
        type: actionTypes.SAVE_USERID_TOKEN,
        data: data,
    }
}

export const saveTokenVerifyEmail = (data) => {
    return {
        type: actionTypes.SAVE_TOKEN_VERIFY_EMAIL,
        data: data,
    }
}