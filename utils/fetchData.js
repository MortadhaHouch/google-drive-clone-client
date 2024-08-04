import sign from "jwt-encode"
async function fetchData(url, method, body, contentType, setIsLoading) {
    let headers = {
        "Set-Cookie":`jwt_token=${document.cookie?.jwt_token}`
    };
    let requestBody = null;
    if (contentType === "json") {
        requestBody = JSON.stringify({body:sign(body,import.meta.env.VITE_SECRET_KEY)});
        headers["Content-Type"] = "application/json";
    }else{
        requestBody = body;
    }
    try {
        setIsLoading(true);
        const request = await fetch(`${import.meta.env.VITE_REQUEST_URL}${url}`, {
            method,
            body:requestBody,
            headers,
            credentials:"include"
        });
        if (contentType === "json") {
            return await request.json();
        } else if (contentType === "blob"){
            return await request.blob();
        }else if (contentType === "formData"){
            const formData = await request.formData();
            // Extract file and additional data
            const file = formData.get('file');
            const additionalData = JSON.parse(formData.get('data'));
            return {file,additionalData};
        }
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
}
export default fetchData;