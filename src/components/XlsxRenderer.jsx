/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';

function XlsxRenderer(props) {
    const [rows, setRows] = useState([]);
    let [file,setFile] = useState(props.file);
    const handleFile = (f) => {
        ExcelRenderer(f, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                setRows(resp.rows);
            }
        });
    };
    useEffect(()=>{
        setFile(file);
        handleFile(file);
        return ()=> setFile(null);
    },[file])
    return (
        <div>
            <table border={"2px solid white"}>
                <thead>
                    <tr>
                        {rows[0]?.map((cell, index) => (
                            <th key={index} style={{border:"2px solid white",padding:"5px"}}>{cell}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} style={{border:"2px solid white",padding:"5px"}}>{cell}</td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export {XlsxRenderer}