import { ADD_ITEM, DELETE_ITEM } from '../actions/saved';
import { LOGOUT } from '../actions/user';

const initialState = {
    itemsList: []
}

const savedReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            const newArr = [action.newItem, ...state.itemsList]
            return {...state, itemsList: newArr }
        case DELETE_ITEM:
            const updatedArr = state.itemsList.filter(item => item.audio !== action.audio)
            return {...state, itemsList: updatedArr }
        case LOGOUT:
            return initialState;
        default:
            return state
    }
}

export default savedReducer;