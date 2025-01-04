import AIFileEx from "../assets/ai-files.png"
import DocFileEx from "../assets/doc-files.png"
import JPGFileEx from "../assets/jpg-files.png"
import PDFFileEx from "../assets/pdf-files.png"
import PNGFileEx from "../assets/png-files.png"
import PPTFileEx from "../assets/ppt-files.png"
import FolderEx from "../assets/2610003_6330.jpg"
import txtExt from "../assets/txt-file-ext.jpeg"
import mp4Ext from "../assets/mp4-file-ext.png"
import MpegEx from "../assets/mpeg-file-ext.png"
import htmlExt from "../assets/html-file-ext.png"
import cppExt from "../assets/c++-file-ext.jpeg"
import zipExt from "../assets/zip-ext.png"
import xmlExt from "../assets/xml-file-ext.png"
import FileExt from "../assets/file-ext.png"
export function FileIcon(props){
    if(props.file?.isFile){
        switch (props.file.name.split('.')[props.file.name.split('.').length - 1].toLowerCase()) {
            case "jpeg":
            case "jpg":
                return (
                    <img 
                        src={JPGFileEx} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
                case "zip":
                return (
                    <img 
                        src={zipExt} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
                case "xml":
                return (
                    <img 
                        src={xmlExt} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
                case "txt":
                return (
                    <img 
                        src={txtExt} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
                case "mp4":
                return (
                    <img 
                        src={mp4Ext} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
                case "html":
                return (
                    <img 
                        src={htmlExt} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
                case "cpp":
                return (
                    <img 
                        src={cppExt} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
                case "mpeg":
                return (
                    <img 
                        src={MpegEx} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
            case "ai":
                return (
                    <img 
                        src={AIFileEx} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
            case "doc":
                return (
                    <img 
                        src={DocFileEx} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
            case "pdf":
                return (
                    <img 
                        src={PDFFileEx} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
            case "png":
                return (
                    <img 
                        src={PNGFileEx} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
            case "ppt":
                return (
                    <img 
                        src={PPTFileEx} 
                        alt="file type" 
                        style={{width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light"
                        }}
                    />
                )
            default:
                return (
                    <img 
                        src={FileExt} 
                        alt="file type" 
                        style={{
                            width:props.size||100,
                            height:props.size||100,
                            borderRadius:"10px",
                            mixBlendMode:"soft-light",
                            objectFit:"cover",
                            objectPosition:"center"
                        }}
                    />
                )
        }
    }else{
        return (
            <img src={FolderEx} alt="file type" style={{width:props.size||100,height:props.size||100,borderRadius:"10px",mixBlendMode:"soft-light"}} />
        )
    }
}