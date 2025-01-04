import { useContext, useEffect, useRef, useState } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
import FileUpload from "./FileUpload";
import DataContainer, { formatFileSize } from "./DataContainer";
import DocumentViewer from "./DocumentViewer";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import fetchData from "../../utils/fetchData";
import { jwtDecode } from "jwt-decode";
import NoDataFound from "../assets/no-file.svg";
import { AiOutlineFileSearch } from "react-icons/ai";
import { RiFileAddLine } from "react-icons/ri";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FileIcon } from "./FileIcon";
import { IoGrid } from "react-icons/io5";
import { LuFileScan } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi"
import Dialog from "./Dialog"
import { audioExtensions, imageExtensions, textExtensions, videoExtensions } from "../../utils/constants";
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
    let [isGrid,setIsGrid] = useState(true);
    const [isShown,setIsShown] = useState(false);
    const [previewItem,setPreviewedItem] = useState(null);
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
    useEffect(()=>{
        console.log(previewItem);
    },[previewItem])
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
                                let response = jwtDecode(request.token);
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
            {files.length > 0 ? (
                files.map((item, index) => (
                    <div 
                        key={index} 
                        ref={(el) => containerRefs.current.push(el)}
                        className="file-container"
                    >
                        <button 
                            className="btn"
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
                                                owner:{
                                                    firstName:"item.owner.firstName",
                                                    lastName:"item.owner.lastName",
                                                    email:"item.owner.email"
                                                }
                                            }
                                        });
                                    }else if(imageExtensions.includes(item.name.split(".").pop()) || textExtensions.includes(item.name.split(".").pop())){
                                        const request = await fetchData("/file/by-id/"+item.id,"GET",null,"json","formData",setIsLoading);
                                        setPreviewedItem(request);
                                    }else{
                                        setPreviewedItem(null);
                                    }
                                }catch(error){
                                    console.log(error);
                                }
                            }}
                        >
                            <LuFileScan 
                                style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }} 
                                color={isDark || JSON.parse(localStorage.getItem("isDark")) ? "#fff" : "#000"}
                                size={20}
                            />
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