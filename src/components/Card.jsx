import Tilt from "react-parallax-tilt"
export default function Card() {
    return (
        <Tilt
            tiltMaxAngleX={40}
            tiltMaxAngleY={40}
            perspective={1000}
            transitionSpeed={1500}
            scale={1.1}
            gyroscope={true}
        >
            <div className="card">
                <h1>React Parallax Tilt 👀</h1>
            </div>
        </Tilt>
    )
}
