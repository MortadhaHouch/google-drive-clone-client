/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import { useDispatch } from "react-redux";
import { checkIsLoggedIn } from "../../reducers/actions";
import { useCookies } from "react-cookie";
import FileUpload from "./FileUpload";
import sign from "jwt-encode"
import { LoginContext } from "../providers/LoginProvider";
import { DarkThemeContext } from "../providers/DarkTheme";
import Animation from "./Animation";
export default function Signup() {
    let [email ,setEmail] = useState("");
    let [password ,setPassword] = useState("");
    let [isLoading,setIsLoading] = useState(false);
    let [firstName,setFirstName] = useState("");
    let [lastName,setLastName] = useState("");
    let [emailError,setEmailError] = useState("");
    let [nameError,setNameError] = useState("");
    let darkTheme = useContext(DarkThemeContext);
    let [cookie,setCookie,removeCookie] = useCookies(["jwt_token"]);
    let [file,setFile] = useState("");
    let dispatch = useDispatch();
    let {isLoggedIn,setIsLoggedIn} = useContext(LoginContext);
    useEffect(()=>{
        setFile(file);
    },[file])
    async function handleSubmit(e){
        e.preventDefault();
        try {
            let {data,isVerified} = await fetchData("/user/signup","POST",{
                firstName,
                lastName,
                password,
                email,
                file
            },"json","json",setIsLoading);
            if(isVerified){
                setIsLoggedIn(true);
                const {email,firstName,lastName,avatar} = data;
                dispatch(checkIsLoggedIn("LOGIN"));
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
                setIsLoggedIn(false);
                setEmailError(request.email_error);
                dispatch(checkIsLoggedIn("LOGOUT"));
                localStorage.setItem("isLoggedIn",false);
            }else if(request.firstName_error){
                setIsLoggedIn(false);
                setNameError(request.firstName_error);
                dispatch(checkIsLoggedIn("LOGOUT"));
                localStorage.setItem("isLoggedIn",false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main 
            className="d-flex min-vw-100 min-vh-100 flex-column justify-content-center align-items-center" 
            style={{
                backgroundColor:(darkTheme.isDark|| JSON.parse(localStorage.getItem("isDark")))?"#3C0753":"#9290C3",
                paddingTop:"160px",
            }}>
            <form 
                action="" method="post" 
                onSubmit={handleSubmit} 
                className="d-flex flex-column justify-content-center align-items-center" 
                style={{width:"clamp(300px,40%,450px)"}}
            >
                <div className="mb-3 w-100">
                    <label htmlFor="firstName" className="form-label">first name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        aria-describedby="helpId"
                        placeholder="first name"
                        onChange={(e)=>setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="lastName" className="form-label">last name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        aria-describedby="helpId"
                        placeholder="last name"
                        onChange={(e)=>setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                    <FileUpload file={file} setFile={setFile} multiple={false}/>
                </div>
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
                    Sign up
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
                        <p>{emailError}</p>
                    )
                }
                {
                    nameError && (
                        <p>{nameError}</p>
                    )
                }
            </form>
        </main>
    )
}
