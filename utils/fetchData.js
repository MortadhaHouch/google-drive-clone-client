async function fetchData(url, method, body, contentType, expectedContentType, setIsLoading) {
    let headers = {
        "Set-Cookie": `jwt_token=${document.cookie?.jwt_token}`
    };
    let requestBody = null;
    switch (method) {
        case "GET":
        case "DELETE":
            requestBody = null;
            break;
        case "POST":
        case "PUT":
            if (contentType === "json") {
                headers["Content-Type"] = "application/json";
                requestBody = JSON.stringify(body);
            } else if (contentType === "formData") {
                requestBody = new FormData();
                Object.keys(body).forEach(key => {
                    const value = body[key];
                    if (Array.isArray(value)) {
                        value.forEach((item) => requestBody.append(key, item));
                    } else if (value instanceof File) {
                        requestBody.append(key, value);
                    } else {
                        requestBody.append(key, JSON.stringify(value));
                    }
                });
            }
            break;
        default:
            throw new Error("Unsupported HTTP method");
    }
    try {
        setIsLoading(true);
        const request = await fetch(`${import.meta.env.VITE_REQUEST_URL}${url}`, {
            method,
            body: requestBody,
            headers,
            credentials: "include"
        });
        if (expectedContentType === "json") {
            return await request.json();
        } else if (expectedContentType === "blob") {
            return await request.blob();
        } else if (expectedContentType === "formData") {
            const formData = await request.formData();
            const file = formData.get('file');
            const additionalData = JSON.parse(formData.get('data'));
            return { file, additionalData };
        }
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
}
export default fetchData;