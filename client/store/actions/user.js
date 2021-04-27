import { auth } from "../../api/config";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_DATA = "UPDATE_DATA";

export const updateData = (newData) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_DATA, newData });
  };
};

export const updateWatched = (reset) => {
  return (dispatch, getState) => {
    if (reset) {
      dispatch(updateData({ watchedVideos: 0 }));
      return;
    }
    const { watchedVideos } = getState().user;
    dispatch(updateData({ watchedVideos: watchedVideos + 1 }));
  };
};

export const login = (uid, email, refreshToken, isNewUser) => {
  return (dispatch) => {
    const newData = {
      uid,
      email,
      refreshToken,
      coinAmount: isNewUser ? 3 : 0,
    };
    dispatch(updateData(newData));
  };
};

export const logout = () => {
  return async (dispatch) => {
    await auth.signOut();
    dispatch({ type: LOGOUT });
  };
};
