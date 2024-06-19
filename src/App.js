import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./app.scss";
import About from "./components/about/About";
import Login from "./components/login/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.body}
      <Footer />
    </>
  )
}

const App = () => {

  const loginData = useSelector(state => state.login)
  console.log(loginData)

  const navigate = useNavigate()
  useEffect(()=>{
    if(!loginData?.data?.stsTokenManager?.accessToken){
      navigate("/login")
    }
  }, [loginData?.data?.stsTokenManager?.accessToken])

  return (
      <Routes>
        <Route path="/home" element={<Layout body = {<Home />}/>}/>
        <Route path="/contact" element={<Layout body={<Contact />} />} />
        <Route path="/about" element={<Layout body={<About />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
  )
}

export default App;