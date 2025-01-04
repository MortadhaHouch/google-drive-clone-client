import Tilt from "react-parallax-tilt"
import { DarkThemeContext } from "../providers/DarkTheme";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import StorageImage from "../assets/server_740505.png"
import FolderShareImage from "../assets/file-security_11514758.png"
import FileDownloadImage from "../assets/file_14910297.png"
import FileShareImage from "../assets/file_1346945.png"
import FilesImage from "../assets/document_11456210.png"
import FoldersImage from "../assets/case-file_2621727.png"
import FolderDownloadImage from "../assets/arrow_13542822.png";
import fetchData from "../../utils/fetchData";
import { formatFileSize } from "./DataContainer";
export default function AccountPreview() {
    let {isDark} = useContext(DarkThemeContext);
    let [userData,setUserData] = useState({
        filesCount:0,
        foldersCount:0,
        sharedFoldersCount:0,
        sharedFilesCount:0,
        filesDownloadsCount:0,
        foldersDownloadsCount:0,
        storageSize:0,
    });
    let [isLoading,setIsLoading] = useState(false);
    async function handleDataLoad(){
        try {
            let request = await fetchData("/user/preview","GET",null,"json","json",setIsLoading);
            let response = jwtDecode(request.token);
            setUserData(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        handleDataLoad()
    },[])
    return (
        <main className="w-100 d-flex flex-row justify-content-center align-items-center flex-wrap">
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
                }}>{userData.filesCount}</h2>
                <img src={FilesImage} alt="image" width={75} height={75} />
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
                }}>{userData.foldersCount}</h2>
                <img src={FoldersImage} alt="image" width={75} height={75} />
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Folders</h3>
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
                }}>{userData.foldersDownloadsCount}</h2>
                <img src={FolderDownloadImage} alt="image" width={75} height={75} />
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
                }}>{userData.filesDownloadsCount}</h2>
                <img src={FileDownloadImage} alt="image" width={75} height={75} />
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
                }}>{formatFileSize(userData.storageSize)}</h2>
                <img src={StorageImage} alt="image" width={75} height={75} />
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>used monthly</h3>
            </Tilt>
            {/* <Tilt style={{
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
                }}>10</h2>
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Collaborations with friends</h3>
            </Tilt> */}
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
                }}>{userData.sharedFilesCount}</h2>
                <img src={FileShareImage} alt="image" width={75} height={75} />
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
                }}>{userData.sharedFoldersCount}</h2>
                <img src={FolderShareImage} alt="image" width={75} height={75} />
                <h3
                style={{
                    color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                    fontSize:"15px",
                    cursor:"pointer",
                    opacity:.75
                }}>Folders Shared</h3>
            </Tilt>
        </main>
    )
}
