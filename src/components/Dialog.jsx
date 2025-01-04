import { useContext } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
import FileRenderer from "./FileRenderer";
import { formatFileSize } from "./DataContainer";
import { IoCreate, IoDownload } from "react-icons/io5";
import { MdEdit, MdUpdate } from "react-icons/md";
import { HiEye, HiLockClosed, HiLockOpen } from "react-icons/hi";
import { FileIcon } from "./FileIcon";
import { FiDownloadCloud } from "react-icons/fi";
import moment from "moment";
import { RiApps2AddFill } from "react-icons/ri";
import { MdOpenInNew } from "react-icons/md";
import { NavLink } from "react-router-dom";
export default function Dialog(props) {
    const themeContext = useContext(DarkThemeContext);
    window.addEventListener("keyup",(e)=>{
        if(e.key === "Escape"){
            props.setIsShown(false);
        }
    })
    return (
        <section className={`popup ${props.isShown?"shown":"hidden"}`}>
            <div className={`w-auto ${themeContext.isDark||JSON.parse(localStorage.getItem("isDark"))?"bg-dark":"bg-light"} p-3 position-relative`} style={{borderRadius:15}}>
                <button className="btn btn-danger btn-close" onClick={()=>{
                    props.setIsShown(false)
                }} style={{position:"absolute",top:"10px",right:"10px"}}></button>
                {
                    props.edit && (
                        <form action="" method="post">
                            <div>
                                <label htmlFor="firstName">first name</label>
                                <input type="text" name="firstName" placeholder="firstName" className="form-control" id="" />
                            </div>
                            <div>
                                <label htmlFor="lastName">last name</label>
                                <input type="text" name="lastName" placeholder="lastName" className="form-control" id="" />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="text" name="password" placeholder="password" className="form-control" id="" />
                            </div>
                            <button className="btn btn-info">Confirm</button>
                        </form>
                    )
                }
                {
                    props.createFolder && (
                        <form action="" method="post">
                            <div>
                                <label htmlFor="folderName">folder name</label>
                                <input type="text" name="folderName" placeholder="folder name" className="form-control" id="" />
                            </div>
                            <button className="btn btn-info">Confirm</button>
                        </form>
                    )
                }
                {
                    props.createFile && (
                        <form action="" method="post">
                            <div>
                                <label htmlFor="fileName">file name</label>
                                <input type="text" name="folderName" placeholder="folderName" className="form-control" id="" />
                            </div>
                            <button className="btn btn-info">Confirm</button>
                        </form>
                    )
                }
                {
                    props.delete && (
                        <div>
                            <p>Are you sure you want to delete this file?</p>
                            <button className="btn btn-danger">Yes</button>
                            <button className="btn btn-info">No</button>
                        </div>
                    )
                }
                {
                    props.rename && (
                        <form action="" method="post">
                            <div>
                                <label htmlFor="newName">new name</label>
                                <input type="text" name="newName" placeholder="new name" className="form-control" id="" />
                            </div>
                            <button className="btn btn-info">Confirm</button>
                        </form>
                    )
                }
                {
                    props.share && (
                        <form action="" method="post">
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="text" name="email" placeholder="email" className="form-control" id="" />
                            </div>
                            <button className="btn btn-info">Confirm</button>
                        </form>
                    )
                }
                {
                    props.fileItem && (
                        <div className="file-preview">
                            <div className="owner-data">
                                <img src="" width={70} height={70} style={{border:"2px solid white",borderRadius:"50%"}} alt="avatar" />
                                <h3 className={`${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>{props.fileItem.additionalData.owner.firstName} {props.fileItem.additionalData.owner.lastName}</h3>
                                <h5 className={`${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>{props.fileItem.additionalData.owner.email}</h5>
                            </div>
                            <div className={`file-data ${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>
                                <div>
                                    <p>{props.fileItem.additionalData.name}</p>
                                    <p>{formatFileSize(props.fileItem.additionalData.size)}</p>
                                    <p><span>{props.fileItem.additionalData.views}</span> <HiEye size={15}/></p>
                                    <p>{props.fileItem.additionalData.isPrivate?<HiLockClosed size={15}/>:<HiLockOpen size={15}/>}</p>
                                </div>
                                <button className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-2"><IoDownload size={15}/> <span>{props.fileItem.additionalData.downloads} Download</span></button>
                            </div>
                            <FileRenderer file={props.fileItem.file} metadata={props.fileItem.additionalData}/>
                        </div>
                    )
                }
                {
                    props.folderItem && (
                        <div className="file-preview">
                            <div className="owner-data">
                                <img src="" width={70} height={70} style={{border:"2px solid white",borderRadius:"50%"}} alt="avatar" />
                                <h3 className={`${themeContext.isDark||JSON.parse(localStorage.getItem("isDark"))?"text-light":"text-dark"}`}>{props.folderItem.additionalData.owner.firstName} {props.folderItem.additionalData.owner.lastName}</h3>
                                <h5 className={`${themeContext.isDark||JSON.parse(localStorage.getItem("isDark"))?"text-light":"text-dark"}`}>{props.folderItem.additionalData.owner.email}</h5>
                            </div>
                            <div className={`w-100 d-flex flex-row justify-content-flex-start align-items-center gap-2 ${themeContext.isDark||JSON.parse(localStorage.getItem("isDark"))?"text-light":"text-dark"}`}>
                                <h5 className="w-100 d-flex flex-row justify-content-between align-items-center gap-2 p-2"><span>{props.folderItem.additionalData.name}</span><span className="opacity-50">{formatFileSize(props.folderItem.additionalData.size)}</span></h5>
                            </div>
                            <div className="d-flex flex-column justify-content-between align-items-center gap-2">
                                {
                                    props.folderItem.files.map((file,index)=>{
                                        const modifiedOn = `${(new Date().getDay() - new Date(file.modifiedOn).getDay())>0?`${(new Date().getDay() - new Date(file.modifiedOn).getDay())} days ago`:"Today"} ${(new Date(file.modifiedOn).getMonth() - new Date().getMonth())>0?`${(new Date(file.modifiedOn).getMonth() - new Date().getMonth())} months ago`:""} ${(new Date(file.modifiedOn).getFullYear() - new Date().getFullYear())>0?`${(new Date(file.modifiedOn).getFullYear() - new Date().getFullYear())} years ago`:""}`;
                                        const createdOn = `${(new Date().getDay() - new Date(file.createdOn).getDay())>0?`${(new Date().getDay() - new Date(file.createdOn).getDay())} days ago`:"Today"} ${(new Date(file.createdOn).getMonth() - new Date().getMonth())>0?`${(new Date(file.createdOn).getMonth() - new Date().getMonth())} months ago`:""} ${(new Date(file.createdOn).getFullYear() - new Date().getFullYear())>0?`${(new Date(file.createdOn).getFullYear() - new Date().getFullYear())} years ago`:""}`;
                                            return (
                                                <div key={index} className={`w-100 d-flex flex-row justify-content-start align-items-center gap-2 ${themeContext.isDark||JSON.parse(localStorage.getItem("isDark"))?"text-light":"text-dark"}`} style={{display:"flex",flexDirection:"column",gap:10}}>
                                                    <FileIcon size={50} file={file}/>
                                                    <div className="d-flex flex-column justify-content-between align-items-start gap-1 position-relative">
                                                        <NavLink to={`/file/${file.id}`} target="_blank" className="d-flex flex-row justify-content-start align-items-center gap-2 nav-link">
                                                            <MdOpenInNew className="position-absolute" style={{top:10,right:10}}/>
                                                        </NavLink>
                                                        <h5>{file.name}</h5>
                                                        <div className="d-flex flex-row justify-content-between align-items-center gap-1 opacity-50">
                                                            <p>{formatFileSize(file.size)}</p>
                                                            <p>{file.downloads} <FiDownloadCloud /></p>
                                                            <p>{file.views||0} <HiEye/></p>
                                                            <p>{file.isPrivate?<HiLockClosed size={15}/>:<HiLockOpen size={15}/>}</p>
                                                            <p>{createdOn} <RiApps2AddFill /></p>
                                                            <p>{modifiedOn} <MdEdit /></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                                {
                                    props.folderItem.folders.map((folder,index)=>{             
                                            const modifiedOn = moment(folder.modifiedOn).format("DD/MM/YYYY");
                                            const createdOn = moment(folder.createdOn).format("DD/MM/YYYY");
                                            return(
                                                <div key={index} className={`w-100 d-flex flex-row justify-content-start align-items-center gap-2 ${themeContext.isDark||JSON.parse(localStorage.getItem("isDark"))?"text-light":"text-dark"}`}>
                                                    <FileIcon size={50} file={folder}/>
                                                    <div className="d-flex flex-column justify-content-between align-items-start gap-1 position-relative">
                                                        <MdOpenInNew className="position-absolute" style={{top:10,right:10}}/>
                                                        <h5>{folder.name}</h5>
                                                        <div className="d-flex flex-row justify-content-between align-items-center gap-1 opacity-50">
                                                            <p>{formatFileSize(folder.size)}</p>
                                                            <p>{folder.files.length} Files</p>
                                                            <p>{folder.downloads} Downloads</p>
                                                            <p>{modifiedOn} <RiApps2AddFill /></p>
                                                            <p>{createdOn} <MdEdit /></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
