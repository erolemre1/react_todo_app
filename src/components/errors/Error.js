import {SkewLoader } from 'react-spinners';

function Error({message}) {


    return (
        <div>
            <h2 className="text-center text-danger mt-5" >{message} <SkewLoader color="red" /> </h2>
        </div>
    )
}

export default Error;
