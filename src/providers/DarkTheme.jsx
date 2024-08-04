/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

let DarkThemeContext = createContext();
function DarkThemeProvider({children}){
    let [isDark,setIsDark] = useState(false);
    return(
        <DarkThemeContext.Provider value={{isDark,setIsDark}}>
            {children}
        </DarkThemeContext.Provider>
    )
}
export {DarkThemeProvider,DarkThemeContext}