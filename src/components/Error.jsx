import { useContext } from "react";
import Animation from "./Animation";
import { DarkThemeContext } from "../providers/DarkTheme";
export default function Error() {
  let {isDark} = useContext(DarkThemeContext);
  return (
    <main className="w-100 d-flex flex-column justify-content-center align-items-center" style={{
      backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#071952":"#EBF4F6",
      minHeight:"100vh",
      height:"fit-content"
    }}>
      <Animation state="loading"/>
    </main>
  )
}
