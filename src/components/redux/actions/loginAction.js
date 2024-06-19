import { auth } from '../../../firebase.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const login = () => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const provider = new GoogleAuthProvider();
        const response = await signInWithPopup(auth, provider);
        console.log(response, 'respose.....');

        sessionStorage.setItem("user", JSON.stringify(response.user))

        dispatch({
            type : LOGIN_SUCCESS,
            payload : response.user
        })
    }
    catch(error){
        console.log('Authentication Failed',error);
        dispatch({
            type : LOGIN_FAILURE,
            payload : error
        })
    }

}