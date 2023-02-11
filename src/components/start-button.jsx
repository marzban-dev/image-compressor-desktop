import React, {useContext} from "react";
import classNames from "classnames";
import AppContext from "../context/app.context";
import {sleep} from "../utils";

const StartButton = ({...rest}) => {
    const {inputDirectory, outputDirectory, setCompressionResult, setRunState} = useContext(AppContext);
    const disabled = !inputDirectory || !outputDirectory;

    const onClick = async () => {
        setRunState("running");

        setTimeout(async () => {
            const compressionResult = await window.electronAPI.startProgress(
                inputDirectory.path,
                outputDirectory.path
            );

            await sleep(500);

            setRunState("finish");
            setCompressionResult(compressionResult);
        }, 500)
    }

    const classes = classNames({
        "w-full py-4 text-primary-bright rounded-xl shadow-md transition-all": 1,
        "bg-white-30 cursor-default": disabled,
        "bg-primary hover:bg-[rgb(49,215,169)] active:scale-[0.98]": !disabled,
    });

    return (
        <button
            className={classes}
            onClick={!disabled ? onClick : undefined}
            {...rest}
        >
            Compress
        </button>
    )
}

export default StartButton;