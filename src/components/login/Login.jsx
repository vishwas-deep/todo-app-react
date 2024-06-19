import './login.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/loginAction';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    // const [emailValue, setEmailValue] = useState("");
    // const [passwordValue, setPasswordValue] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginData = useSelector(state => state?.login)

    // const handleAuthenticate = () => {
    //     const data = [
    //         {
    //             email: "shatakshi@gmail.com",
    //             password: "mycutipie",
    //         },
    //     ]
    //     return data.email === emailValue && data.password === passwordValue ? alert("loggedin successfully") : alert("wrong inputs")
    // }
    // login authenticaion
    const handleGoogleLogin = async () => {
        dispatch(login());
    }

    useEffect(() => {
        if (loginData?.data?.stsTokenManager?.accessToken) {
            navigate("/home")
        }
    })

    return (
        <div className='login'>
            <div className='login__container'>
                <div>Todo App</div>
                <button className='buton' onClick={handleGoogleLogin}>
                    Sign in with <FcGoogle />
                </button>
                <div>Developed using ReactJS</div>
            </div>
        </div>

        // <form className='form' onSubmit={handleAuthenticate}>
        //     <div className='fields'>
        //         <h1>Login</h1>
        //         <input required type="text"
        //             value={emailValue}
        //             onChange={(e) => setEmailValue(e.target.value)}
        //             placeholder="Email"
        //         />
        //         <input required type="password"
        //             value={passwordValue}
        //             onChange={(e) => setPasswordValue(e.target.value)}
        //             placeholder="Password"
        //             className="password"
        //         />
        //         <button onClick={handleAuthenticate}>Login</button>
        //     </div>
        // </form>
    )
}

export default Login;