import { auth } from "../../../firebase"

export const LOGOUT = 'LOGOUT'

export const logout = () => async dispatch => {
    await auth.signOut();
    dispatch({
        type : LOGOUT
    })

    sessionStorage.removeItem('infoArray')
    sessionStorage.removeItem('user')
}