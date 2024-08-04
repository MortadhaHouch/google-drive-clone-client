/* eslint-disable react/no-unknown-property */
import { Suspense, useContext, useEffect } from "react";
// import Spline from '@splinetool/react-spline';
import WorkStation from "../Models/WorkStation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DarkThemeContext } from "../providers/DarkTheme";
import Tilt from "react-parallax-tilt";
import AddFile from "../icons/AddFile";
import Collaboration from "../icons/Collaboration";
import DocsReview from "../icons/DocsReview";
import Download from "../icons/Download";
import Files from "../icons/Files";
import FileSearch from "../icons/FileSearch";
import FileSync from "../icons/FileSync";
import Folder from "../icons/Folder";
import PendingApproval from "../icons/PendingApproval";
import SecureStorage from "../icons/SecureStorage";
import Storage from "../icons/Storage";
import TransferData from "../icons/TransferData";
import VideoFile from "../icons/VideoFile";
import ReadMore from "../icons/ReadMore";
import { FaLocationArrow } from "react-icons/fa";
import {gsapAnimation} from "../../utils/gsapAnimations";
import Animation from "./Animation";
export default function Home() {
    let {isDark} = useContext(DarkThemeContext);
    useEffect(()=>{
        gsapAnimation(".tilt-item",{
            opacity:0,
            y:-80,
        },{
            opacity:1,
            y:0,
        },true,false,null);
        gsapAnimation(null,null,null,false,true,"#welcome-text");
    },[])
    return (
        <main style={{
            backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#3C0753":"#9290C3",
            height:"fit-content",
            position:"relative",
            width:"100vw",
            gap:"100px"
        }}>
            <section style={{width:"100%",height:"fit-content"}}>
                <div className="h-auto d-flex flex-column justify-content-center align-items-center landing" style={{
                    width:"clamp(300px,40%,600px)",
                    borderRadius:"20px",
                    borderTop:"1px solid white",
                    borderRight:"1px solid white",
                    padding:"15px"
                }}>
                    <h2 style={{
                        color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                        fontSize:36,
                        marginBottom:40,
                        fontFamily:'"Lobster Two", sans-serif'
                    }}>Store your files <span style={{color:"#17153B"}}>securely</span> and <span style={{color:"#17153B"}}>permanently</span></h2>
                    <p id="welcome-text" style={{
                        color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#EBF4F6":"#071952",
                        fontSize:"20px"
                    }}>Welcome to our state-of-the-art file storage system, where your data&apos;s security and accessibility are our top priorities. Our platform is designed to offer you a seamless and efficient way to store, manage, and access your files from anywhere, at any time. Whether you&apos;re an individual looking for a reliable storage solution or a business in need of scalable data management, our system is built to cater to your unique needs. Experience the peace of mind that comes with knowing your data is safe, organized, and just a click away.</p>
                    <div className="d-flex flex-row justify-content-center align-items-center" style={{
                        gap:"15px",
                        flexWrap:"wrap"
                    }}>
                        <button className="button">
                            Apply Now
                        <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                            <path
                                clipRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                        </button>
                        <button className="learn-more">
                            <span className="circle" aria-hidden="true">
                            <span className="icon arrow"></span>
                        </span>
                            <span className="button-text">Learn More</span>
                        </button>
                    </div>
                </div>
                <Canvas
                    style={{
                        width:"clamp(300px,40%,500px)",
                        height:"100vh"
                    }}>
                    <Suspense fallback={Animation}></Suspense>
                    <ambientLight position={[1,1,1]} intensity={2}/>
                    <directionalLight position={[1,1,1]} intensity={2}/>
                    <OrbitControls enableZoom={false}/>
                    <WorkStation/>
                </Canvas>
            </section>
            <h2 style={{
                color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#FBF6E2":"#131842"
            }}>Services</h2>
                <h3 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#C8ACD6":"#2E236C"}}>
                    File management
                </h3>
                <section className="d-flex flex-row justify-content-center align-items-center flex-wrap">
                    <Tilt className="tilt-item" style={{
                        width:"clamp(300px,40%,400px)",
                        height:"fit-content",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Upload files</h4>
                            <AddFile/>
                            <div
                                style={{
                                    borderRadius:"50%",
                                    boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                    position:"absolute",
                                    display:"flex",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    bottom:0,
                                    right:0,
                                    padding:0
                                }}
                            >
                                <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                                <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                    position:"absolute"
                                }}/>
                            </div>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Secure data storage</h4>
                        <SecureStorage/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Efficient Data storage</h4>
                        <Storage/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Unlimited file download</h4>
                        <Download/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Excellent files management</h4>
                        <Files/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Advances File Search</h4>
                        <FileSearch/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Keep your data sync</h4>
                        <FileSync/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Folder structured Storage</h4>
                        <Folder/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                </section>
                <h3 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#C8ACD6":"#2E236C"}}>
                    Social media collaboration
                </h3>
                <section className="d-flex flex-row justify-content-center align-items-center flex-wrap">
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Share and collaborate with friends</h4>
                        <Collaboration/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Rate others data</h4>
                        <DocsReview/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Data safety</h4>
                        <PendingApproval/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Transfer your data safely</h4>
                        <TransferData/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                </section>
                <h3 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#C8ACD6":"#2E236C"}}>File viewing</h3>
                <section className="d-flex flex-row justify-content-center align-items-center flex-wrap">
                    <Tilt className="tilt-item"style={{
                        width:"clamp(300px,40%,400px)",
                        backgroundColor:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"rgba(7, 65, 115, 0.75)":"rgba(255, 255, 255, 0.25)",
                        backdropFilter:"blur(10px)",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        padding:10,
                        borderRadius:"20px",
                        cursor:"pointer",
                    }}>
                        <h4 style={{color:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"#77E4C8":"#4535C1"}}>Preview your files</h4>
                        <VideoFile/>
                        <div
                            style={{
                                borderRadius:"50%",
                                boxShadow:(isDark|| JSON.parse(localStorage.getItem("isDark")))?"0px 0px 0px 10px #3C0753":"0px 0px 0px 10px #9290C3",
                                position:"absolute",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                bottom:0,
                                right:0,
                                padding:0
                            }}
                        >
                            <ReadMore isDark={isDark || JSON.parse(localStorage.getItem("isDark"))}/>
                            <FaLocationArrow size={25} color={(isDark|| JSON.parse(localStorage.getItem("isDark")))?"whitesmoke":"black"} style={{
                                position:"absolute"
                            }}/>
                        </div>
                    </Tilt>
                </section>
        </main>
    )
}
