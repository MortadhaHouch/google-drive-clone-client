import Tilt from "react-parallax-tilt"
import { DarkThemeContext } from "../providers/DarkTheme";
import { useContext } from "react";
export default function AccountPreview() {
    let {isDark} = useContext(DarkThemeContext);
    return (
        <section>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+100</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Files stored</h3>
            </Tilt>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+150</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Folders stored</h3>
            </Tilt>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+150</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Folders downloaded</h3>
            </Tilt>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+150</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Files downloaded</h3>
            </Tilt>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+150</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Encrypted Files</h3>
            </Tilt>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+15</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Go used monthly</h3>
            </Tilt>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+10</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Collaborations with friends</h3>
            </Tilt>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+150</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Files Shared</h3>
            </Tilt>
            <Tilt style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"clamp(200px,40%,300px)",
                height:"fit-content",
                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                backdropFilter:"blur(10px)",
                padding:"10px 15px",
                borderRadius:15,
                boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                border:"1px solid rgba(255,255,255,.18)"
            }}>
                <h2
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"25px",
                    cursor:"pointer",
                    opacity:.75
                }}>+150</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Folders Shared</h3>
            </Tilt>
        </section>
    )
}
