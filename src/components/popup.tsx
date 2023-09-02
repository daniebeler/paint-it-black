import { ReactNode } from "react";

interface popupProps {
    children: ReactNode
}

const Popup = (props: popupProps) => {
    return <div className="absolute w-screen h-screen bg-black top-0 left-0 bg-opacity-20 flex justify-center items-center">
        <div className="bg-white p-12">
        { props.children }
        </div>
    </div>
}

export default Popup