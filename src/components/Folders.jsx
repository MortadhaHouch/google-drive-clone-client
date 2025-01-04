import { useContext, useEffect, useRef, useState } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
import DataContainer, { formatFileSize } from "./DataContainer";
import fetchData from "../../utils/fetchData";
import NoDataFound from "../assets/no-file.svg"
import FileUpload from "./FileUpload";
import { LuFileScan, LuFolderSearch2 } from "react-icons/lu";
import { TiFolderAdd } from "react-icons/ti";
import {motion} from "framer-motion"
import { FileIcon } from "./FileIcon";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa6";
import Dialog from "./Dialog";
import { MdMemory } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { TbLetterS } from "react-icons/tb";
import { FaSortAmountUp } from "react-icons/fa";
import Loader from "./Loader";
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
    let [isGrid,setIsGrid] = useState(true);
    let [isShown,setIsShown] = useState(false);
    let containerRefs = useRef([]);
    const [pageIndex,setPageIndex] = useState(1);
    const [pages,setPages] = useState(1);
    const [previewFolder,setPreviewFolder] = useState(null);
    async function handleDataLoad(){
        try {
            let request = await fetchData(`/folder/${pageIndex}`,"GET",null,"json","json",setIsLoading);
            if(Array.isArray(request.folders)){
                setFolders(request.folders);
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
            <div className="d-flex flex-row justify-content-between align-items-center flex-wrap gap-2 position-fixed w-100 p-2" style={{top:80,left:0,width:"100vw",zIndex:30,backgroundColor:isDark || JSON.parse(localStorage.getItem("isDark"))?"rgba( 31, 38, 135, 0.75 )":"rgba(235, 244, 246, 0.75)",backdropFilter:"blur(10px)"}}>
                <div className="d-flex flex-row justify-content-start align-items-center gap-2">
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
                <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                    <button 
                        title="sort by name" 
                        className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                        onClick={()=>{
                            let sorted = folders.sort((a,b)=>a.name.localeCompare(b.name));
                            setFolders(sorted);
                        }}
                    >
                        <TbLetterS /><FaSortAmountUp/>
                    </button>
                    <button 
                        title="sort by date" 
                        className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                        onClick={()=>{
                            let sorted = folders.sort((a,b)=>new Date(a.createdOn) - new Date(b.createdOn));
                            setFolders(sorted);
                        }}
                    >
                        <BsCalendar2Date /><FaSortAmountUp/>
                    </button>
                    <button 
                        title="sort by size" 
                        className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                        onClick={()=>{
                            let sorted = folders.sort((a,b)=>a.size - b.size);
                            setFolders(sorted);
                        }}
                    >
                        <MdMemory /><FaSortAmountUp/>
                    </button>
                    <button 
                        title="sort by views count" 
                        className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                        onClick={()=>{
                            let sorted = folders.sort((a,b)=>a.views - b.views);
                            setFolders(sorted);
                        }}
                    >
                        <FaRegEye /><FaSortAmountUp/>
                    </button>
                    <button 
                        title="sort by privacy state" 
                        className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                        onClick={()=>{
                            let sorted = folders.sort((a,b)=>a.isPrivate - b.isPrivate);
                            setFolders(sorted);
                        }}
                    >
                        <FaLock /><FaSortAmountUp/>
                    </button>
                </div>
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
                                    } catch (error) {
                                        console.log(error);
                                        
                                    }
                                }}
                                disabled={isLoading}
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
                        className="w-100 d-flex flex-column justify-content-start align-items-center gap-2"
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
                        isLoading?(
                            <Loader/>
                        ):(
                            folders &&  (
                                folders.length > 0?(
                                    <div className="w-100 d-flex flex-column justify-content-start align-items-center gap-2">
                                        <div className={`files-display ${isGrid?"grid":"column"}`}>
                                            {
                                                folders.map((item,index)=>{
                                                    return(
                                                        <div 
                                                            key={index} 
                                                            ref={(el) => containerRefs.current.push(el)}
                                                            className="file-container"
                                                        >
                                                            <FaRegFolderOpen
                                                                style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }} 
                                                                color={isDark || JSON.parse(localStorage.getItem("isDark")) ? "#fff" : "#000"}
                                                                size={20}
                                                                onClick={async()=>{
                                                                    try {
                                                                        let request = await fetchData(`/folder/by-id/${item.id}`, "GET", null, "json", "json", setIsLoading);
                                                                        if(request){
                                                                            console.log(request);
                                                                            setIsShown(true);
                                                                            setPreviewFolder(request);
                                                                        }
                                                                    } catch (error) {
                                                                        console.log(error);
                                                                    }
                                                                }}
                                                            />
                                                            <DataContainer item={item}/>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div>
                                            {
                                                Array.from({length:pages},(_,index)=>(
                                                    <button 
                                                        key={index} 
                                                        className={`btn ${pageIndex == index?"btn-primary":"btn-info"}`}
                                                        onClick={()=>{
                                                            setPageIndex(index);
                                                        }}
                                                    >
                                                        {index}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
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
                        )
                    }
                    </motion.section>
                )
            }
            {
                previewFolder && (
                    <Dialog setIsShown={setIsShown} isShown={isShown} folderItem={previewFolder}/>
                )
            }
        </section>
    )
}
