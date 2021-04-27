export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

export const addItem = ({ audio, name, number, img }) => {
  return (dispatch) => {
    const newItem = {
      audio,
      name,
      number,
      img,
      recordedAt: new Date(),
    };
    dispatch({ type: ADD_ITEM, newItem });
  };
};

export const deleteItem = (audio) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, audio });
  };
};
