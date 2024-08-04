/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import { store } from "../../reducers/store";
import Logo from "./Logo";
import { useContext, useEffect, useState } from "react";
import { MdDashboard, MdOutlineLightMode, MdTimer } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import fetchData from "../../utils/fetchData";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { checkIsLoggedIn } from "../../reducers/actions";
import { useDispatch } from "react-redux";
import { FaTimeline, FaUser } from "react-icons/fa6";
import { FaHistory, FaHome, FaTimes } from "react-icons/fa";
import { DarkThemeContext } from "../providers/DarkTheme";
import { LoginContext } from "../providers/LoginProvider";
export default function Header() {
    store.subscribe(()=>{
        console.log("data store connected")
    })
    let {isDark,setIsDark} = useContext(DarkThemeContext);
    let [isLoading,setIsLoading] = useState(false);
    let {isLoggedIn,setIsLoggedIn} = useContext(LoginContext);
    let [cookie,setCookie,removeCookie] = useCookies(["jwt_token"]);
    let [message,setMessage] = useState("");
    let dispatch = useDispatch();
    useEffect(()=>{
        setMessage(message);
        return ()=>setMessage("");
    },[message])
    return (
        <header className=" d-flex flex-row justify-content-between align-items-center w-100 p-3 fixed-top" style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(32, 30, 67, 0.75)":"rgba(238, 238, 238, 0.75)",
            backdropFilter:"blur(10px)",
            zIndex:100
        }}>
            <div className="container d-flex flex-row justify-content-start align-items-center gx-3">
                <Logo/>
                <h1 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#201E43"}}>File Hub</h1>
            </div>
            <nav
                className="navbar navbar-expand-sm"
            >
                <div className="container">
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#nav-items"
                        aria-controls="nav-items"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon text-light"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav-items">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0 d-lg-flex flex-lg-row justify-lg-content-center align-lg-items-center d-xs-flex flex-xs-column justify-content-xs-start align-items-xs-center" style={{gap:"10px"}}>
                            <li className="nav-item d-flex flex-row justify-content-center align-items-center">
                                <FaHome color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/><NavLink className="nav-link" style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}} to="/home" aria-current="page">home</NavLink>
                            </li>
                            {
                                isLoggedIn || JSON.parse(localStorage.getItem("isLoggedIn")) ?(
                                    <>
                                        <li className="nav-item d-flex flex-row justify-content-center align-items-center">
                                            <FaHistory color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/><NavLink className="nav-link" style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}} to="/recent" aria-current="page">recent</NavLink>
                                        </li>
                                        <li className="nav-item d-flex flex-row justify-content-center align-items-center">
                                            <MdDashboard color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/><NavLink className="nav-link" style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}} to="/dashboard" aria-current="page">dashboard</NavLink>
                                        </li>
                                        <li className="nav-item d-flex flex-row justify-content-center align-items-center">
                                            <FaUser color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/><NavLink className="nav-link" style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}} to="/profile" aria-current="page">profile</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <img src={localStorage.getItem("avatar")} alt="" width={50} height={50} style={{borderRadius:"50%"}}/>
                                        </li>
                                        <li className="nav-item">
                                        <button className="Btn" onClick={async()=>{
                                                try {
                                                    let request = await fetchData("/user/logout","POST",{
                                                        email:localStorage.getItem("email"),
                                                    },"json",setIsLoading);
                                                    console.log(jwtDecode(request.token));
                                                    if(jwtDecode(request.token).message){
                                                        setMessage(jwtDecode(request.token).message);
                                                        removeCookie("jwt_token",{
                                                            path:"/"
                                                        });
                                                        setIsLoggedIn(false);
                                                        dispatch(checkIsLoggedIn("LOGOUT"));
                                                        localStorage.setItem("isLoggedIn",false);
                                                        localStorage.removeItem("email");
                                                        localStorage.removeItem("avatar");
                                                        localStorage.removeItem("firstName");
                                                        localStorage.removeItem("lastName");
                                                    }else if(jwtDecode(request.token).error){
                                                        setMessage(jwtDecode(request.token).error);
                                                    }else{
                                                        console.log(jwtDecode(request.token));
                                                    }
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}>
                                            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                                            <div className="text">Logout</div>
                                        </button>
                                        </li>
                                    </>
                                ):(
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login" aria-current="page" style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                                                login
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signup" style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                                                signup
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }
                            <button className="btn" onClick={()=>{
                                setIsDark(!isDark);
                                localStorage.setItem("isDark",`${!isDark}`);
                            }}>
                                {
                                    isDark?(
                                        <MdOutlineLightMode size={25} color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"}/>
                                    ):(
                                        <MdDarkMode size={25} color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"}/>
                                    )
                                }
                            </button>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}