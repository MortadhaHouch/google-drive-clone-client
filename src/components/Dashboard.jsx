import { useContext } from "react";
import Aside from "./Aside"
import { DarkThemeContext } from "../providers/DarkTheme";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
    let {isDark} = useContext(DarkThemeContext);
    return (
        <main style={{backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#071952":"#EBF4F6",height:"fit-content",minHeight:"100vh"}}>
            <Aside/>
            <Outlet/>
        </main>
    )
}
