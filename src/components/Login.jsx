/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import fetchData from "../../utils/fetchData";
import { useDispatch } from "react-redux";
import { checkIsLoggedIn } from "../../reducers/actions";
import {Cookies, useCookies} from "react-cookie";
import sign from "jwt-encode"
import { LoginContext } from "../providers/LoginProvider";
import { DarkThemeContext } from "../providers/DarkTheme";
import Animation from "./Animation"
export default function Login() {
    let [email ,setEmail] = useState("");
    let [password ,setPassword] = useState("");
    let [isLoading,setIsLoading] = useState(false);
    let [emailError,setEmailError] = useState("");
    let [passwordError,setPasswordError] = useState("");
    let {isLoggedIn,setIsLoggedIn} = useContext(LoginContext);
    let {isDark} = useContext(DarkThemeContext);
    let dispatch = useDispatch();
    let [cookie,setCookie,removeCookie] = useCookies(["jwt_token"])
    async function handleSubmit(e){
        e.preventDefault();
        try {
            let request = await fetchData("/user/login","POST",{
                email:email.trim(),
                password:password.trim(),
            },"json","json",setIsLoading)
            if(request.isVerified){
                setIsLoggedIn(true);
                dispatch(checkIsLoggedIn("LOGIN"));
                const {email,firstName,lastName,avatar} = request.data;
                localStorage.setItem("isLoggedIn",true);
                localStorage.setItem("email",email);
                localStorage.setItem("firstName",firstName);
                localStorage.setItem("lastName",lastName);
                localStorage.setItem("avatar",avatar);
                setCookie(
                    "jwt_token",
                    sign({
                        email:localStorage.getItem("email"),
                        firstName:localStorage.getItem("firstName"),
                        lastName:localStorage.getItem("lastName")
                    },import.meta.env.VITE_SECRET_KEY),
                    {
                        path:"/",
                        expires:new Date(Date.now()+1000*60*60*24*30),
                    }
                )
            }else if(request.email_error){
                setEmailError(request.email_error);
                dispatch(checkIsLoggedIn("LOGOUT"));
                localStorage.setItem("isLoggedIn",false);
            }else if(request.password_error){
                setPasswordError(request.password_error);
                dispatch(checkIsLoggedIn("LOGOUT"));
                localStorage.setItem("isLoggedIn",false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className="w-100 min-vh-100 d-flex flex-column justify-content-center align-items-center" style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#3C0753":"#9290C3",
        }}>
            <form action="" method="post" onSubmit={handleSubmit} style={{width:"clamp(300px,40%,450px)"}} className="w-50 d-flex flex-column justify-content-center align-items-center">
                <div className="mb-3 w-100">
                    <label htmlFor="email" className="form-label">email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={email}
                        aria-describedby="helpId"
                        placeholder="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="password" className="form-label">password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        aria-describedby="helpId"
                        placeholder="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="signup-btn">
                    login
                    <div className="arrow-wrapper">
                        <div className="arrow"></div>
                    </div>
                </button>
                {
                    isLoading && (
                        <Animation state="login"/>
                    )
                }
                {
                    emailError && (
                        <p style={{
                            color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                            fontSize:"20px"
                        }}>{emailError}</p>
                    )
                }
                {
                    passwordError && (
                        <p style={{
                            color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                            fontSize:"20px"
                        }}>{passwordError}</p>
                    )
                }
            </form>
        </main>
    )
}
