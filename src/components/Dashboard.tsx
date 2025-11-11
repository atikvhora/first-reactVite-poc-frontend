import { Fragment } from "react"
import { SampleCanvas } from "./ThreeFiberComponent/SampleCanvase"
import { ImagePlane } from "./ThreeFiberComponent/ImagePlane"
import { Canvas } from "@react-three/fiber"

export const Dashboard = () => {
    return (
        <Fragment>
            <div className="card lg:card-side bg-base-300 shadow-sm grid grid-cols-3 gap-4">
                <div className="card-body">
                    <SampleCanvas />
                </div>
                <div className="card-body">
                    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <planeGeometry args={[5, 3]} />
                        <ImagePlane imageUrl="/images/chair.jpg" />
                    </Canvas>
                </div>
            </div>
        </Fragment>
    )
}