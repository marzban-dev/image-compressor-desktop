import React, {useContext} from "react";
import AppContext from "../context/app.context";

const BackButton = () => {
    const {setCompressionResult, setInputDirectory, setOutputDirectory, setRunState} = useContext(AppContext)

    const resetStates = () => {
        setRunState("idle");
        setCompressionResult(null);
        setInputDirectory(null);
        setOutputDirectory(null);
    }

    return (
        <button className="fixed z-[25] top-[15px] left-[15px] cursor-pointer" onClick={resetStates}>
            ❌
        </button>
    )
}

export default BackButton;