import { LOGIN } from "../constants";

const initialState = {
    isLogged: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogged: true
            }

        default:
            return state;
    }
}

export default authReducer;
