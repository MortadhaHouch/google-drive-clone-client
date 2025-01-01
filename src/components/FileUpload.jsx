import { IoCloudUploadOutline } from "react-icons/io5";
import { useEffect } from "react";
import fileReading from "../../utils/fileReading";

export default function FileUpload(props) {
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (props.multiple && props.filesToUpload) {
            props.setFilesToUpload([...files]);
        }
        if (props.multiple && props.foldersToUpload) {
            props.setFoldersToUpload([...files]);
        }
        if (props.setFile && files.length > 0) {
            try {
                const selectedFile = files[0];
                const imageURL = await fileReading(selectedFile);
                props.setFile(imageURL);
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }
        e.target.value = null;
    };
    useEffect(() => {
        if (props.filesToUpload) {
            console.log("Updated files:", props.filesToUpload);
        }
    }, [props.files]);
    return (
        <div style={{
            backgroundColor: (props.isDark || JSON.parse(localStorage.getItem("isDark"))) 
                ? "rgba(7, 65, 115, 0.75)" 
                : "rgba(255, 255, 255, 0.25)",
            border: `1px dashed ${(props.isDark || JSON.parse(localStorage.getItem('isDark'))) 
                ? 'rgba(255, 255, 255, 0.25)' 
                : 'rgba(7, 65, 115, 0.75)'}`,
        }}>
            <div className="file-upload">
                {
                    props.webkitdirectory? (
                        <input 
                            name="files" 
                            type="file" 
                            accept="*" 
                            onChange={handleFileChange} 
                            multiple={props.multiple} 
                            webkitdirectory="true"
                        />
                    ):(
                        <input 
                            name="files" 
                            type="file" 
                            accept="*" 
                            onChange={handleFileChange} 
                            multiple={props.multiple}
                        />
                    )
                }
                <IoCloudUploadOutline />
            </div>
        </div>
    );
}