import { LOGOUT, UPDATE_DATA } from '../actions/user';
import { ADD_ITEM } from '../actions/saved';

const initialState = {
    uid: '',
    refreshToken: '',
    email: '',
    coinAmount: 0,
    watchedVideos: 0,
    callWarningIgnored: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DATA:
            return {...state, ...action.newData }
        case LOGOUT:
            return initialState;
        case ADD_ITEM:
            return {
                ...state,
                coinAmount: Math.max(0, state.coinAmount - 1)
            }
        default:
            return state
    }
}

export default userReducer;