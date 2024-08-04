/* eslint-disable react/prop-types */
import { createContext, useState } from "react"
let LoginContext = createContext();
function LoginProvider({children}){
    let [isLoggedIn,setIsLoggedIn] = useState(false);
    return(
        <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}
export {LoginProvider,LoginContext}