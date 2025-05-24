import { useContext, useEffect, useRef, useState } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
import FileUpload from "./FileUpload";
import DataContainer, { formatFileSize } from "./DataContainer";
import DocumentViewer from "./DocumentViewer";
import { MdMemory, MdOutlineRemoveCircleOutline } from "react-icons/md";
import fetchData from "../../utils/fetchData";
import NoDataFound from "../assets/no-file.svg";
import { AiOutlineFileSearch } from "react-icons/ai";
import { RiFileAddLine } from "react-icons/ri";
import { IoCloudUploadOutline, IoList } from "react-icons/io5";
import { FileIcon } from "./FileIcon";
import { IoGrid } from "react-icons/io5";
import { LuFileScan, LuFolderSearch2 } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi"
import Dialog from "./Dialog"
import { audioExtensions, documentBasedExtensions, imageExtensions, textExtensions, videoExtensions } from "../../utils/constants";
import { TiFolderAdd } from "react-icons/ti";
import { TbLetterS } from "react-icons/tb";
import { FaLock, FaRegEye, FaSortAmountUp } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
export default function Files() {
    let { isDark } = useContext(DarkThemeContext);
    let [multiple, setMultiple] = useState(true);
    let [file, setFile] = useState(null);
    let [files, setFiles] = useState([]);
    let containerRefs = useRef([]);
    let [filesToUpload, setFilesToUpload] = useState([]);
    const [imageURL, setImageURL] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    let [componentName, setComponentName] = useState("preview");
    let [isGrid,setIsGrid] = useState(false);
    const [isShown,setIsShown] = useState(false);
    const [previewItem,setPreviewedItem] = useState(null);
    const [searchTerm,setSearchTerm] = useState("");
    async function handleDataLoad() {
        try {
            let request = await fetchData("/file/1", "GET", null, "json", "json", setIsLoading);
            if (Array.isArray(request.files)) {
                setFiles(request.files);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleDataLoad();
    }, []);
    return (
        <main 
            className="d-flex flex-column justify-content-start align-items-center" 
            style={{
                backgroundColor: isDark || JSON.parse(localStorage.getItem("isDark")) ? "#071952" : "#EBF4F6",
                width: "100vw",
                height: "fit-content",
                padding: "20px",
            }}
        >
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <button 
                className={`btn ${componentName === "preview" ? "btn-primary" : "btn-info"}`}
                onClick={() => setComponentName("preview")}
            >
                <AiOutlineFileSearch size={20} />
                <span>show</span>
            </button>
            <button 
                className={`btn ${componentName === "upload" ? "btn-primary" : "btn-info"}`}
                onClick={() => setComponentName("upload")}
            >
                <RiFileAddLine size={20} />
                <span>upload</span>
            </button>
        </div>
        {componentName === "upload" && (
            <section className="w-100 d-flex flex-column justify-content-start align-items-center gap-1">
                <FileUpload 
                    setImageURL={setImageURL} 
                    setFileUrl={setFileUrl} 
                    files={files}
                    setFiles={setFiles} 
                    multiple={multiple}
                    filesToUpload={filesToUpload}
                    setFilesToUpload={setFilesToUpload}
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
                                let formData = new FormData();
                                for (let [key, value] of Object.entries(filesToUpload)) {
                                    formData.append(key, value);
                                }
                                let request = await fetchData("/file/upload", "POST", filesToUpload, "formData", "json", setIsLoading);
                            } catch (error) {
                                console.log(error);
                                
                            }
                        }}
                    >
                        <IoCloudUploadOutline size={20} /> upload
                    </button>
                )}
            </section>
        )}
        {componentName === "preview" && (
            <section
                className={`files-display ${isGrid ? "grid" : "column"}`}
                style={{
                    backgroundColor: isDark || JSON.parse(localStorage.getItem("isDark")) ? "#071952" : "#EBF4F6",
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
                        <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="search" name="" id="" className="form-control" />
                        <button disabled={searchTerm.length === 0} className="btn btn-primary">search</button>
                        <button 
                            title="sort by name" 
                            className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                            onClick={()=>{
                                let sorted = files.sort((a,b)=>a.name.localeCompare(b.name));
                                setFiles(sorted);
                            }}
                        >
                            <TbLetterS /><FaSortAmountUp/>
                        </button>
                        <button 
                            title="sort by date" 
                            className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                            onClick={()=>{
                                let sorted = files.sort((a,b)=>new Date(a.createdOn) - new Date(b.createdOn));
                                setFiles(sorted);
                            }}
                        >
                            <BsCalendar2Date /><FaSortAmountUp/>
                        </button>
                        <button 
                            title="sort by size" 
                            className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                            onClick={()=>{
                                let sorted = files.sort((a,b)=>a.size - b.size);
                                setFiles(sorted);
                            }}
                        >
                            <MdMemory /><FaSortAmountUp/>
                        </button>
                        <button 
                            title="sort by views count" 
                            className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                            onClick={()=>{
                                let sorted = files.sort((a,b)=>a.views - b.views);
                                setFiles(sorted);
                            }}
                        >
                            <FaRegEye /><FaSortAmountUp/>
                        </button>
                        <button 
                            title="sort by privacy state" 
                            className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                            onClick={()=>{
                                let sorted = files.sort((a,b)=>a.isPrivate - b.isPrivate);
                                setFiles(sorted);
                            }}
                        >
                            <FaLock /><FaSortAmountUp/>
                        </button>
                        <button 
                            title="sort by privacy state" 
                            className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-1"
                            onClick={()=>{
                                setIsGrid((val)=>!val)
                            }}
                        >
                            {isGrid?<IoList/>:<IoGrid/>}
                        </button>
                    </div>
                </div>
            {files.length > 0 ? (
                files.map((item, index) => (
                    <div 
                        key={index} 
                        ref={(el) => containerRefs.current.push(el)}
                        className={`file-container position-relative ${isGrid?"flex-column":"flex-row w-100"}`}
                        style={{
                            boxShadow:isDark||JSON.parse(localStorage.getItem("isDark"))?"0px 0px 2px #EBF4F6" : "0px 0px 2px #071952",
                            borderRadius:10
                        }}
                    >
                        <button 
                            className="btn btn-primary position-absolute"
                            style={{top:0,right:0}}
                            onClick={async() => {
                                try{
                                    setIsShown(true);
                                    if(videoExtensions.includes(item.name.split(".").pop())|| audioExtensions.includes(item.name.split(".").pop())){
                                        setPreviewedItem({
                                            file:import.meta.env.VITE_REQUEST_URL+"/file/buffer/"+item.id,
                                            additionalData:{
                                                name:item.name,
                                                views:item.views,
                                                downloads:item.downloads,
                                                size:item.size,
                                                createdAt:item.createdAt,
                                                updatedAt:item.updatedAt,
                                                isPrivate:item.isPrivate,
                                                isFile:true,
                                            }
                                        });
                                    }else if(imageExtensions.includes(item.name.split(".").pop()) || textExtensions.includes(item.name.split(".").pop())){
                                        const request = await fetchData("/file/by-id/"+item.id,"GET",null,"json","formData",setIsLoading);
                                        console.log(request);
                                        setPreviewedItem(request)
                                    }else if(documentBasedExtensions.includes(item.name.split(".").pop())){
                                        const request = await fetchData("/file/by-id/"+item.id,"GET",null,"json","formData",setIsLoading);
                                        console.log(request);
                                        setPreviewedItem(request)
                                    }
                                }catch(error){
                                    console.log(error);
                                }
                            }}
                        >
                            <LuFileScan 
                                color={isDark || JSON.parse(localStorage.getItem("isDark")) ? "#fff" : "#000"}
                                size={20}
                            />
                            view
                        </button>
                        <DataContainer item={item} />
                    </div>
                ))
            ) : (
                <img 
                    src={NoDataFound} 
                    alt="No Data Found" 
                    style={{
                        width: "clamp(300px, 40%, 500px)",
                        height: "clamp(300px, 40%, 500px)",
                    }} 
                />
            )}
            {multiple === false && (
                <>
                    {imageURL && (
                        <img src={imageURL} alt="Selected" width={200} height={200} style={{ borderRadius: 10, marginTop: 20 }} />
                    )}
                    {file && !file.type.includes("image") && (
                        <DocumentViewer fileUrl={fileUrl} file={file} setFile={setFile} />
                    )}
                </>
            )}
            </section>
        )}
        {
            previewItem && isShown && (
                <Dialog setIsShown={setIsShown} isShown={true} fileItem={previewItem}/>
            )
        }
        </main>
    );
}