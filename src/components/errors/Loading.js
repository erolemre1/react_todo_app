import { useState } from 'react'
import { PulseLoader } from 'react-spinners';
function Loading() {
    let [color, setColor] = useState("green");

    return (
        <div className="sweet-loading mt-5">
            <h2 onClick ={()=> setColor("red")} className="text-center text-success mt-5 ">Loading  <PulseLoader color={color}
            /></h2>
        </div>
    )
}

export default Loading
