import getContentType from "./getContentType";

async function fileReading(file){
    return new Promise((res,rej)=>{
        let fileReader = new FileReader();
        switch (getContentType(file)) {
            case "image/avif":
            case "image/gif":
            case "image/jpeg":
            case "image/png":
            case "image/svg+xml":
            case "image/tiff":
            case "image/vnd.wap.wbmp":
            case "image/webp":
            case "image/x-icon":
            case "image/x-jng":
            case "image/x-ms-bmp":
                fileReader.readAsDataURL(file);
                break;
            case "text/css":
            case "text/html":
            case "text/mathml":
            case "text/plain":
            case "text/vnd.sun.j2me.app-descriptor":
            case "text/vnd.wap.wml":
            case "text/x-component":
            case "text/xml":
                    fileReader.readAsText(file);
                    break;
            default:
                break;
        }
        fileReader.onload = ()=>{
            res(fileReader.result);
        }
        fileReader.onerror = ()=>{
            rej("file reading error");
        }
    })
}
export default fileReading