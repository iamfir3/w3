import actionTypes from "./actionTypes";
import apiUser from "../../apis/user";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apiUser.getCurrent();
    if (response?.status === 0)
      dispatch({
        type: actionTypes.GET_CURRENT,
        data: response.user,
      });
  } catch (error) {}
};

export const updateProfile = (data) => async (dispatch) => {
  await apiUser.update({ avatar: data });
  const response = await apiUser.getCurrent();
  if (response?.status === 0)
    dispatch({
      type: actionTypes.GET_CURRENT,
      data: response.user,
    });
};
