import { combineReducers } from "redux";
import authReducer from "./authReucer";

const reducers = combineReducers({
    auth: authReducer
})

export default reducers;
