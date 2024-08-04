import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaReddit } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useContext } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
export default function Footer() {
    let {isDark} = useContext(DarkThemeContext);
    return (
        <footer style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(32, 30, 67, 0.75)":"rgba(238, 238, 238, 0.75)",
            backdropFilter:"blur(10px)",
            padding:"20px",
            gap:10,
        }}>
            <button className="btn btn-outline-info">
                <FaReddit size={30} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/>
            </button>
            <button className="btn btn-outline-info">
                <FaDiscord size={30} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/>
            </button>
            <button className="btn btn-outline-info">
                <FaInstagram size={30} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/>
            </button>
            <button className="btn btn-outline-info">
                <FaXTwitter size={30} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/>
            </button>
            <button className="btn btn-outline-info">
                <FaFacebook size={30} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EEEEEE":"#686D76"}/>
            </button>
        </footer>
    )
}
