import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/loginAction"
import { LOGOUT } from "../actions/logoutAction"

const initialState = {
    loadng: false,
    data: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null,
    error: null
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case LOGOUT: {
            console.log("first")
            return {
                ...state,
                loadng: false,
                data: null,
                error: null
            }
        }
        default: {
            return state
        }
    }
}