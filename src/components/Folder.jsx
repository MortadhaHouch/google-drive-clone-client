import React from 'react'

export default function Folder() {
  return (
    <main
        className="d-flex flex-column justify-content-start align-items-center" 
        style={{
            backgroundColor: isDark || JSON.parse(localStorage.getItem("isDark")) ? "#071952" : "#EBF4F6",
            width: "100vw",
            height: "fit-content",
            padding: "20px",
        }}
    >
        
    </main>
  )
}
