import actionTypes from './actionTypes'
import { apiSendMessage } from '../../apis/chatbot'


export const getResponseBot = (payload) => async (dispatch) => {
    try {
        const response = await apiSendMessage(payload)
        console.log(response);
        if (response?.err === 0) {
            dispatch({
                type: actionTypes.MESSAGE_BOT,
                message: response.response
            })
        } else {
            dispatch({
                type: actionTypes.MESSAGE_BOT,
                message: null
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: actionTypes.MESSAGE_BOT,
            message: null
        })
    }
    dispatch(loadingBot(false))
}

export const addTextUser = (postcard) => ({
    type: actionTypes.MESSAGE_USER,
    data: postcard
})

export const buy = (data) => ({
    type: actionTypes.BUY,
    data
})
export const cancelBuy = (data) => ({
    type: actionTypes.CANCEL_BUY,
    data
})
export const updateQuantity = (data) => ({
    type: actionTypes.UPDATE_QUANTITY,
    data
})

export const loadingBot = (flag) => ({
    type: actionTypes.BOT_LOADING,
    flag
})