import actionTypes from "../actions/actionTypes";

const initState = {
    messages: [],
    buyData: {
        isBuy: false,
        pid: null
    },
    isLoadingBot: false
}

const chatbotReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.MESSAGE_BOT:
            console.log(action);
            return {
                ...state,
                messages: action.message
                    ? [...state.messages, ...action.message.map(i => ({
                        text: i?.text,
                        isBot: true,
                        postcard: i?.postcard,
                        className: i?.className,
                        list: i?.list,
                        detail: i?.detail
                    }))]
                    : state.messages
            }

        case actionTypes.MESSAGE_USER:
            return {
                ...state,
                messages: [...state.messages, { text: action.data.value }]
            }
        case actionTypes.BUY:
            return {
                ...state,
                buyData: action.data
            }

        case actionTypes.CANCEL_BUY:
            return {
                ...state,
                isBuy: action.data.isBuy,
                buyData: []
            }
        case actionTypes.BOT_LOADING:
            return {
                ...state,
                isLoadingBot: action.flag
            }
        case actionTypes.UPDATE_QUANTITY:
            return {
                ...state,
                buyData: [
                    ...state.buyData?.map(i => {
                        if (i.id === action.data?.id) i.quantity = action?.data?.quantity
                        return i
                    })
                ]
            }
        default:
            return state;
    }
}

export default chatbotReducer