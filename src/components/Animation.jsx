/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import { useContext } from "react";
import animationData1 from "../assets/Animation - loading.json"
import animationData2 from "../assets/Animation - error.json"
import animationData3 from "../assets/Animation - file-transfer.json"
import animationData4 from "../assets/Animation - folder-scan.json"
import animationData5 from "../assets/Animation - uploading.json"
import animationData6 from "../assets/Animation - login.json"
import { DarkThemeContext } from "../providers/DarkTheme";
/* eslint-disable no-unused-vars */
export default function Animation(props) {
    let {isDark} = useContext(DarkThemeContext);
    return (
        <section className="animation" style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 25, 82, 0.75)":"rgba(235, 244, 246, 0.75)",
        }}>
            {
                props.state=="loading" && (
                    <Lottie animationData={animationData1}/>
                )
            }
            {
                props.state=="error" && (
                    <Lottie animationData={animationData2}/>
                )
            }
            {
                props.state=="folder-transfer" && (
                    <Lottie animationData={animationData3}/>
                )
            }
            {
                props.state=="folder-scan" && (
                    <Lottie animationData={animationData4}/>
                )
            }
            {
                props.state=="uploading" && (
                    <Lottie animationData={animationData5}/>
                )
            }
            {
                props.state=="login" && (
                    <Lottie animationData={animationData6}/>
                )
            }
        </section>
    )
}
