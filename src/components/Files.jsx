import { useContext,useRef,useState } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
import FileUpload from "./FileUpload";
import DataContainer from "./DataContainer";
import DocumentViewer from "./DocumentViewer";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
export default function Files() {
    let {isDark} = useContext(DarkThemeContext);
    let [multiple,setMultiple] = useState(true);
    let [file, setFile] = useState(null);
    let [files, setFiles] = useState([]);
    let containerRefs = useRef([]);
    const [imageURL, setImageURL] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    return (
        <main className="d-flex flex-column justify-content-center align-items-center" style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#071952":"#EBF4F6",
            minHeight:"100vh",
            width:"100vw",
            height:"fit-content",
            gap:10
        }}>
            <FileUpload setImageURL={setImageURL} setFileUrl={setFileUrl} file={file} setFile={setFile} files={files} setFiles={setFiles} multiple={multiple}/>
            <section
                className="files-display"
                style={{
                    backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#071952":"#EBF4F6",
                }}>
                {
                    files.map((item,index)=>{
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
                                    onClick={()=>{
                                        files.splice(files.indexOf(item),1);
                                        setFiles(files);
                                        console.log(files);
                                        console.log(containerRefs.current[index]);
                                        containerRefs.current[index].classList.add("hidden");
                                    }}
                                />
                                <DataContainer item={item}/>
                            </div>
                        )
                    })
                }
                {
                    multiple == false && (
                        <>
                            {imageURL && (
                                <img src={imageURL} alt="Selected" width={200} height={200} style={{ borderRadius: 10, marginTop: 20 }} />
                            )}
                            {file && !file.type.includes("image") && (
                                <DocumentViewer fileUrl={fileUrl} file={file} setFile={setFile} />
                            )}
                        </>
                    )
                }
            </section>
        </main>
    )
}
