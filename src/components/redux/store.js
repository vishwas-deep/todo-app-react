import { applyMiddleware, combineReducers, createStore } from "redux";
import { loginReducer } from "./reducers/LoginReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

const rootReducer  = combineReducers({
    login: loginReducer,
});

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
  
export default store;