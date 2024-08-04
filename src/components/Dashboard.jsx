import { useContext } from "react";
import Aside from "./Aside"
import { DarkThemeContext } from "../providers/DarkTheme";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
    let {isDark} = useContext(DarkThemeContext);
    return (
        <main className="w-100 d-flex flex-column justify-content-center align-items-center" style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#071952":"#EBF4F6",
            minHeight:"100vh",
            height:"fit-content"
        }}>
            <Aside/>
            <Outlet/>
        </main>
    )
}
