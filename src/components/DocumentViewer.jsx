/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { XlsxRenderer } from "./XlsxRenderer";
import { useRef } from "react";
import DocxViewer from "./DocxViewer";
export default function DocumentViewer(props) {
    let popupRef = useRef();
    return (
        <section className={`popup ${props.file?"shown":"hidden"}`} ref={popupRef}>
            <button type="button" className="btn btn-close bg-danger position-absolute" style={{
                top: "100px",
                right: "50px",
                cursor: "pointer",
                zIndex:10
            }}
            onClick={()=>{
                popupRef.current?.classList.replace("shown","hidden");
                props.setFile(null);
            }}
            ></button>
            {
                props.file.name.includes("xlsx") || props.file.name.includes("xls") && (
                    <XlsxRenderer file={props.fileUrl}/>
                )
            }
            {
                props.file.name.includes("pdf") && (
                    <iframe src={props.fileUrl} frameBorder="0" style={{
                        width: "clamp(300px,60%,100%)",
                        height: "90vh",
                        border: "none"
                    }}></iframe>
                )
            }
            {
                props.file.name.split(".")[props.file.name.split(".").length - 1].includes("doc") && (
                    <DocxViewer file={props.file}/>
                )
            }
        </section>
    )
}
