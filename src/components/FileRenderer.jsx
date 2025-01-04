import React, { useEffect, useState } from 'react'
import getContentType from '../../utils/getContentType';
import fileReading from '../../utils/fileReading';
import { audioExtensions, videoExtensions } from '../../utils/constants';
import JsonView from '@uiw/react-json-view';
export default function FileRenderer(props) {
    const [fileData, setFileData] = useState(props.file);
    useEffect(()=>{
        handleFileParsing();
    },[fileData])
    async function handleFileParsing(){
        try {
            if(!(audioExtensions.includes(props.metadata.name.split(".")[props.metadata.name.split(".").length - 1])||videoExtensions.includes(props.metadata.name.split(".")[props.metadata.name.split(".").length - 1]))){
                let fileObj = await fileReading(props.file);
                if(fileObj){
                    setFileData(fileObj);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const mimeType = getContentType(props.metadata);
    if(mimeType.includes("image")){
        return (
            <img src={URL.createObjectURL(props.file)} alt="file" style={{width:"clamp(300px,40%,450px)",height:"auto"}}/>
        )
    }else if(mimeType.includes("video")){
        return (
            <video src={props.file} controls style={{width:"clamp(300px,40%,450px)",height:"auto"}}/>
        )
    }else if(mimeType.includes("audio")){
        return (
            <audio src={props.file.path} controls style={{width:"clamp(250px,40%,350px)",height:"auto"}}/>
        )
    }else if(mimeType.includes("pdf")){
        return (
            <iframe src={URL.createObjectURL(props.file)} title="file" style={{width:"clamp(300px,40%,500px)",height:"auto"}}/>
        )
    }else if(mimeType.includes("text")){
        return (
            <pre style={{width:"clamp(300px,40%,500px)",height:"auto"}}>{JSON.stringify(fileData)}</pre>
        )
    }
}
