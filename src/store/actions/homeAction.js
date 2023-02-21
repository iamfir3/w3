import actionTypes from "./actionTypes";

export const showHomenav = (state)=>{
    return {
      type: actionTypes.SHOW_HOMENAV,
    }
  }

  export const hiddenHomenav = (state)=>{
    return {
      type: actionTypes.HIDDEN_HOMENAV,
    }
  }
  