/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IoCloudUploadOutline } from "react-icons/io5";
import fileReading from "../../utils/fileReading"; // Assuming this utility reads the file and returns a URL
import { useEffect, useState } from "react";
export default function FileUpload(props) {
    const [file, setFile] = useState(null);
    useEffect(() => {
        if (file) {
            console.log(file);
            const reader = new FileReader();
            reader.onload = () => {
                props.setFileUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
        return () => {
            if (file) {
                console.log("Cleaning up file:", file);
                setFile(null);
                props.setFileUrl("");
            }
        };
    }, [file]);

    const handleFileChange = async (e) => {
        if(props.multiple){
            props.setFiles([...e.target.files]);
            console.log(props.files);
        }else{
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            if (selectedFile.type.includes("image")) {
                try {
                    const imageURL = await fileReading(selectedFile);
                    props.setFile({
                        imageURL,
                        name: selectedFile.name,
                        type: selectedFile.type,
                        size: selectedFile.size,
                    });
                    props.setImageURL(imageURL);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        // Clear the file input value to ensure the change event fires even for the same file
        e.target.value = null;
    };

    return (
        <div style={{
            backgroundColor: (props.isDark || JSON.parse(localStorage.getItem("isDark"))) ? "rgba(7, 65, 115, 0.75)" : "rgba(255, 255, 255, 0.25)",
            border: `1px dashed ${(props.isDark || JSON.parse(localStorage.getItem('isDark'))) ? 'rgba(255, 255, 255, 0.25)' : 'rgba(7, 65, 115, 0.75)'}`,
        }}>
            <div className="file-upload">
                <input type="file" onChange={handleFileChange} multiple={props.multiple}/>
                <IoCloudUploadOutline/>
            </div>
        </div>
    );
}
