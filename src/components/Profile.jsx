import { useContext } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
import { MdEdit } from "react-icons/md";
export default function Profile() {
    let {isDark} = useContext(DarkThemeContext);
    return (
        <main className="w-100 d-flex flex-column justify-content-start align-items-center" style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#071952":"#EBF4F6",
            minHeight:"100vh",
            height:"fit-content"
        }}>
            <section className="profile-data position-relative">
                <MdEdit
                    size={25}
                    style={{
                        color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer"
                    }}
                />
                <div>
                    <img src={localStorage.getItem("avatar")} alt="" width={100} height={100} style={{borderRadius:"10%"}}/>
                </div>
                <div 
                    className="d-flex flex-row justify-content-between align-items-center"
                    style={{
                        color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                        fontSize:"25px",
                        width:"100%"
                    }}>
                        <h2>{localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</h2>
                    </div>
                <div
                    className="d-flex flex-row justify-content-between align-items-center"
                    style={{
                        color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                        fontSize:"25px",
                        width:"100%"
                    }}>
                    <h3 
                        style={{
                            color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                            fontSize:"15px",
                            cursor:"pointer",
                            opacity:.75,
                            width:"100%"
                        }}>@{localStorage.getItem("email")}</h3>
                    </div>
            </section>
        </main>
    )
}
