/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaFile, FaFolder, FaShare } from "react-icons/fa6";
import { ImBin2 } from "react-icons/im";
import { MdNotifications, MdStorage } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { DarkThemeContext } from "../providers/DarkTheme";
import {NavLink} from "react-router-dom"
import { VscOpenPreview } from "react-icons/vsc";
export default function Aside() {
    let [isShown,setIsShown] = useState(false);
    let {isDark,setIsDark} = useContext(DarkThemeContext);
    return (
        <aside className={`${isShown?"shown":""} vertical`} style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#201E43":"#EEEEEE",
            backdropFilter:"blur(10px)"
        }}>
            <button className="aside-toggle btn btn-info" onClick={()=>setIsShown(!isShown)}>{
                isShown?(
                    <FaArrowLeft/>
                ):(
                    <FaArrowRight/>
                )
            }</button>
            <ul>
                <li 
                    style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                    <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center" 
                    style={{gap:10}} 
                    to={"/dashboard"}><VscOpenPreview /><span>preview</span></NavLink>
                </li>
                <li 
                    style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                    <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center" 
                    style={{gap:10}} 
                    to={"/dashboard/files"}><FaFile/><span>files</span></NavLink>
                </li>
                <li 
                    style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                    <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center" 
                    style={{gap:10}} 
                    to={"/dashboard/folders"}><FaFolder/><span>folders</span></NavLink>
                </li>
                <li 
                    style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                    <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center" 
                    style={{gap:10}} 
                    to={"/dashboard/shared"}><FaShare/><span>shared with me</span></NavLink>
                </li>
                <li 
                    style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                    <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center" 
                    style={{gap:10}} 
                    to={"/dashboard/storage"}><MdStorage/><span>storage space</span></NavLink>
                </li>
                <li 
                    style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                    <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center" 
                    style={{gap:10}} 
                    to={"/dashboard/bin"}><ImBin2/><span>bin</span></NavLink>
                </li>
                <li 
                    style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                    <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center" 
                    style={{gap:10}} 
                    to={"/dashboard/plans"}><MdPayment/><span>plans</span></NavLink>
                </li>
                <li 
                    style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#134B70"}}>
                    <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center" 
                    style={{gap:10}} 
                    to={"/dashboard/notifications"}><MdNotifications/><span>notifications</span></NavLink>
                </li>
            </ul>
        </aside>
    )
}
