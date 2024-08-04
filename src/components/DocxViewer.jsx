/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import * as DocxPreview from 'docx-preview';

const DocumentViewer = (props) => {
    const [pages, setPages] = useState([]);
    const containerRef = useRef(null);
    const handleFileChange = async () => {
        if (props.file) {
            try {
                const arrayBuffer = await props.file.arrayBuffer();
                // Ensure containerRef is not null
                if (containerRef.current) {
                containerRef.current.innerHTML = ''; // Clear previous content
                await DocxPreview.renderAsync(arrayBuffer, containerRef.current,null,{
                    className : "docx", //class name/prefix for default and document style classes
                    inWrapper : true, //enables rendering of wrapper around document content
                    ignoreWidth : false, //disables rendering width of page
                    ignoreHeight : false, //disables rendering height of page
                    ignoreFonts : false, //disables fonts rendering
                    breakPages : true, //enables page breaking on page breaks
                    ignoreLastRenderedPageBreak : false, //disables page breaking on lastRenderedPageBreak elements
                    experimental : false, //enables experimental features (tab stops calculation)
                    trimXmlDeclaration : true, //if true, xml declaration will be removed from xml documents before parsing
                    useBase64URL:  false, //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
                    renderChanges: false, //enables experimental rendering of document changes (inserions/deletions)
                    renderHeaders: true, //enables headers rendering
                    renderFooters: true, //enables footers rendering
                    renderFootnotes: true, //enables footnotes rendering
                    renderEndnotes: true, //enables endnotes rendering
                    renderComments: true, //enables experimental comments rendering
                    debug:  false, //enables additional logging
                });
                // Wait for the content to be rendered before extracting HTML
                    setTimeout(() => extractPagesFromDOM(), 100); // Adjust timeout as necessary
                }
            } catch (error) {
                console.error('Error processing file:', error);
            }
        }
    };
    useEffect(()=>{
        handleFileChange();
    },[props.file]);
    const extractPagesFromDOM = () => {
        if (containerRef.current) {
            const html = containerRef.current.innerHTML;
            // Example page break marker, adjust as needed
            const pageBreakMarker = '<div class="page-break"></div>'; 
            const splitPages = html.split(pageBreakMarker);
            setPages(splitPages);
        }
    };
    return (
        <div style={{
            width:"100%",
            height:"fit-content",
            backgroundColor:"whitesmoke",
            overflowY:"scroll",
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-start",
            alignItems:"center"
        }}>
            {pages.map((page, index) => (
                <div key={index} style={{width:"100%"}}>
                    <div dangerouslySetInnerHTML={{ __html: page }} />
                </div>
            ))}
            {/* Make sure the ref container is rendered */}
            <div ref={containerRef} style={{ display: 'none' }} />
        </div>
    );
};

export default DocumentViewer;
