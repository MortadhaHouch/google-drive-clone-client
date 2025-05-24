import { useContext } from "react";
import { FileIcon } from "./FileIcon";
import { DarkThemeContext } from "../providers/DarkTheme";

/* eslint-disable react/prop-types */
export default function DataContainer(props) {
    const themeContext = useContext(DarkThemeContext)
    return (
        <>
            <FileIcon file={props.item} isFile={props.item.isFile}/>
            <h5 className={`${themeContext.isDark||JSON.parse(localStorage.getItem("isDark"))?"text-light":"text-dark"}`}>{props.item.name.length > 10?props.item.name.slice(0,10)+"...":props.item.name}</h5>
            <h6 className={`${themeContext.isDark||JSON.parse(localStorage.getItem("isDark"))?"text-light":"text-dark"} opacity-75`}>{formatFileSize(props.item.size)}</h6>
        </>
    )
}
export function formatFileSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let size = bytes;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(size) + ' ' + units[unitIndex];
}
