import { useContext, useEffect, useState } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
import DataContainer, { formatFileSize } from "./DataContainer";
import fetchData from "../../utils/fetchData";
import NoDataFound from "../assets/no-file.svg"
import { jwtDecode } from "jwt-decode";
import FileUpload from "./FileUpload";
import { LuFolderSearch2 } from "react-icons/lu";
import { TiFolderAdd } from "react-icons/ti";
import {motion} from "framer-motion"
import { FileIcon } from "./FileIcon";
import { IoCloudUploadOutline } from "react-icons/io5";
export default function Folders() {
    let {isDark} = useContext(DarkThemeContext);
    let [isLoading,setIsLoading] = useState(false);
    let [file, setFile] = useState(null);
    let [folder, setFolder] = useState(null);
    let [files, setFiles] = useState([]);
    let [filesToUpload, setFilesToUpload] = useState([]);
    let [foldersToUpload, setFoldersToUpload] = useState([]);
    let [folders, setFolders] = useState([]);
    let [multiple, setMultiple] = useState(true);
    let [allowDirectories,setAllowDirectories] = useState(true);
    let [componentName, setComponentName] = useState("preview");
    async function handleDataLoad(){
        try {
            let request = await fetchData("/folder","GET",null,"json","json",setIsLoading);
            let response = jwtDecode(request.token);
            if(Array.isArray(response.folders)){
                setFolders(response.folders);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        handleDataLoad();
    },[])
    useEffect(()=>{
        console.log([...filesToUpload]);
    },[filesToUpload])
    return (
        <section 
            className="d-flex flex-column justify-content-start align-items-center" 
            style={{
                backgroundColor: isDark || JSON.parse(localStorage.getItem("isDark")) ? "#071952" : "#EBF4F6",
                width: "100vw",
                height: "fit-content",
                padding: "20px",
            }}
        >
            <div>
                <button 
                    className={`btn ${componentName == "preview"?"btn-primary":"btn-info"}`}
                    onClick={async()=>{
                        try {
                            setComponentName("preview")
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    ><LuFolderSearch2 /><span>show</span></button>
                <button 
                    className={`btn ${componentName == "upload"?"btn-primary":"btn-info"}`}
                    onClick={async()=>{
                        try {
                            setComponentName("upload")
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    ><TiFolderAdd /><span>upload</span></button>
            </div>
            {
                componentName == "upload" && (
                    <motion.section 
                        className="d-flex flex-column justify-content-center align-items-center flex-wrap g-1"
                        transition={{
                            duration:.75,
                            ease:"easeInOut",
                            type:"spring"
                        }}
                        variants={{
                            initial:{
                                y:50,
                                opacity:0
                            },
                            final:{
                                y:0,
                                opacity:1
                            }
                        }}
                        initial="initial"
                        animate="final"
                    >
                        <FileUpload 
                            file={file} 
                            setFile={setFile} 
                            files={files}
                            filesToUpload={filesToUpload}
                            setFilesToUpload={setFilesToUpload}
                            foldersToUpload={foldersToUpload}
                            setFoldersToUpload={setFoldersToUpload}
                            multiple={multiple}
                            webkitdirectory={allowDirectories}
                        />
                        <div className="files-display">
                            {filesToUpload.length > 0 ? (
                                filesToUpload.map((item, index) => (
                                    <div key={index} className="file-card">
                                        <p className={`${isDark || JSON.parse(localStorage.getItem("isDark")) ? "text-light" : "text-dark"}`}>
                                            {item.name.length > 10 ? item.name.slice(0, 9) + "..." : item.name}
                                        </p>
                                        <p className={`${isDark || JSON.parse(localStorage.getItem("isDark")) ? "text-light" : "text-dark"}`}>
                                            {formatFileSize(item.size)}
                                        </p>
                                        <FileIcon file={item} isFile={true} />
                                    </div>
                                ))
                            ) : (
                                <p className={`${isDark || JSON.parse(localStorage.getItem("isDark")) ? "text-light" : "text-dark"}`}>
                                    No files selected
                                </p>
                            )}
                        </div>
                        {filesToUpload.length > 0 && (
                            <button 
                                className="btn btn-primary"
                                onClick={async()=>{
                                    try {
                                        let filePaths = filesToUpload.map((item)=>{
                                            return item.webkitRelativePath
                                        })
                                        let request = await fetchData("/folder/upload", "POST", {filesToUpload,filePaths}, "formData", "json", setIsLoading);
                                        let response = jwtDecode(request.token);
                                    } catch (error) {
                                        console.log(error);
                                        
                                    }
                                }}
                            >
                                <IoCloudUploadOutline size={20} /> upload
                            </button>
                        )}
                    </motion.section>
                )
            }
            {
                componentName == "preview" && (
                    <motion.section
                        className="files-display"
                        transition={{
                            duration:.75,
                            ease:"easeInOut",
                            type:"spring"
                        }}
                        variants={{
                            initial:{
                                y:50,
                                opacity:0
                            },
                            final:{
                                y:0,
                                opacity:1
                            }
                        }}
                        initial="initial"
                        animate="final"
                        style={{
                            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#071952":"#EBF4F6",
                        }}
                    >
                    {
                        folders && (
                            folders.length > 0?(
                                folders.map((item,index)=>{
                                    return(
                                        <div 
                                            key={index} 
                                            ref={(el) => containerRefs.current.push(el)}
                                            style={{
                                                backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                                                position:"relative"
                                            }}>
                                            <MdOutlineRemoveCircleOutline 
                                                style={{position:"absolute",top:"10px",right:"10px",cursor:"pointer"}} 
                                                color="red" 
                                                size={20}
                                            />
                                            <DataContainer item={item}/>
                                        </div>
                                    )
                                })
                            ):(
                                <img 
                                    src={NoDataFound} 
                                    alt="" 
                                    style={{
                                        width:"clamp(300px,40%,500px)",
                                        height:"clamp(300px,40%,500px)",
                                    }}
                                />
                            )
                        )
                    }
                    </motion.section>
                )
            }
        </section>
    )
}
