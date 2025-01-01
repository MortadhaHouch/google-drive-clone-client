/* eslint-disable react/prop-types */

import { useContext } from "react";
import { DarkThemeContext } from "../providers/DarkTheme";
import FileRenderer from "./FileRenderer";
import { formatFileSize } from "./DataContainer";
import { IoCreate, IoDownload } from "react-icons/io5";
import { MdUpdate } from "react-icons/md";
import { HiEye, HiLockClosed, HiLockOpen } from "react-icons/hi";
/* eslint-disable no-unused-vars */
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
                    console.log("closed");
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
                                <h4 className={`${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>{props.fileItem.additionalData.owner.email}</h4>
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
            </div>
        </section>
    )
}
