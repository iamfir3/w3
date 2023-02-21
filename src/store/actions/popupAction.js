import actionTypes from "./actionTypes";

export const togglePopup = (state)=>{
    return {
      type: actionTypes.TOGGLE_POPUP,
      data:state
    }
  }
  