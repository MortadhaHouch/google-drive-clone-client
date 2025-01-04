import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DarkThemeContext } from '../providers/DarkTheme';
import fetchData from '../../utils/fetchData';
import Loader from './Loader';
import FileRenderer from './FileRenderer';
import NoDataFound from "../assets/no-file.svg"
import { formatFileSize } from './DataContainer';
import { HiEye, HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { IoDownload } from 'react-icons/io5';
export default function File() {
    const {id} = useParams();
    const [isLoading,setIsLoading] = useState(false);
    const themeContext = useContext(DarkThemeContext);
    const [file,setFile] = useState(null);
    const [errorType,setErrorType] = useState({user:false,file:false,auth:false});
    useEffect(()=>{
        handleDataLoading();
    },[])
    async function handleDataLoading(){
        try {
            const request = await fetchData(`/file/by-id/${id}`,"GET",null,"json","formData",setIsLoading)
            if(request.isVerified){
                setFile(request);
            }else if(request.user_error){
                setErrorType(()=>{return {user:true,file:false,auth:false}})
            }else if(request.file_error){
                setErrorType(()=>{return {user:false,file:true,auth:false}})
                setFile(null);
            }else if(request.auth_error){
                setErrorType(()=>{return {user:false,file:false,auth:true}})
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main
            className="d-flex flex-column justify-content-start align-items-center" 
            style={{
                backgroundColor: themeContext.isDark || JSON.parse(localStorage.getItem("isDark")) ? "#071952" : "#EBF4F6",
                width: "100vw",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            {
                isLoading?(
                    <Loader/>
                ):(
                    file?(
                        <>
                            {
                                errorType.user && (
                                    <div className={`${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>
                                        <p>Please create an account</p>
                                    </div>
                                )
                            }
                            {
                                errorType.auth && (
                                    <div className={`${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>
                                        <p>You are not allowed to access this resource</p>
                                        <h4>If you want to access this resource please send a request to the owner of this resource</h4>
                                    </div>
                                )
                            }
                            {
                                !(errorType.user && errorType.auth) && (
                                    <div className="file-preview">
                                        <div className="owner-data">
                                            <img src="" width={70} height={70} style={{border:"2px solid white",borderRadius:"50%"}} alt="avatar" />
                                            <h3 className={`${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>{file.additionalData.owner.firstName} {file.additionalData.owner.lastName}</h3>
                                            <h5 className={`${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>{file.additionalData.owner.email}</h5>
                                        </div>
                                        <div className={`file-data ${themeContext.isDark||localStorage.getItem("isDark")?"text-light":"text-dark"}`}>
                                            <div>
                                                <p>{file.additionalData.name}</p>
                                                <p>{formatFileSize(file.additionalData.size)}</p>
                                                <p><span>{file.additionalData.views}</span> <HiEye size={15}/></p>
                                                <p>{file.additionalData.isPrivate?<HiLockClosed size={15}/>:<HiLockOpen size={15}/>}</p>
                                            </div>
                                            <button className="btn btn-info d-flex flex-row justify-content-center align-items-center gap-2"><IoDownload size={15}/> <span>{file.additionalData.downloads} Download</span></button>
                                        </div>
                                        <FileRenderer file={file.file} metadata={file.additionalData}/>
                                    </div>
                                )
                            }
                        </>
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
        </main>
    )
}
