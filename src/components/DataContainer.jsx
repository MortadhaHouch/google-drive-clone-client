import { FileIcon } from "./FileIcon";

/* eslint-disable react/prop-types */
export default function DataContainer(props) {
    return (
        <>
            <h5>{props.item.name}</h5>
            <h6>{formatFileSize(props.item.size)}</h6>
            <FileIcon file={props.item} isFile={props.item.isFile}/>
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
