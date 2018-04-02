// import Immutable from 'immutable'
// const initialState = Immutable.fromJS({
//     userInfo: null
// })
export const user = (state = {}, action) => {
    switch (action.type) {
        case "userInfo":
            state.userInfo = action.userInfo;
            return { ...state }
        default:
            return state;
    }
}