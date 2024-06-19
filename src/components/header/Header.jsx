import { Link} from "react-router-dom";
import "./header.scss"
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/logoutAction";


const Header = () => {

    const loginData = useSelector(state => state.login)
    console.log(loginData)

    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(logout())
    }
    return (
        <div className="header">
            <div className="header__left">
                <img className="initials" src={loginData?.data?.photoURL} alt="image" />
                <div className="name">{loginData?.data?.displayName}</div>
            </div>
            <div className="header__right">
                <div className="nav">
                    <Link to='/home'>Home</Link>
                    <Link to='/contact'>Contact</Link>
                    <Link to='/about'>About</Link>


                </div>
                <div className="logout" onClick={handleLogout}>
                    <Link to='/login'><MdLogout /></Link>

                </div>

            </div>
        </div>
    )
}

export default Header;