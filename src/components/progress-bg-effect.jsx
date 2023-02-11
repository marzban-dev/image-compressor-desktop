import React, {useContext} from "react";
import {motion} from "framer-motion";
import classNames from "classnames";
import AppContext from "../context/app.context";

const ProgressBgEffect = () => {
    const {runState} = useContext(AppContext)

    const classes = classNames({
        "w-[200px] h-full bg-progress transition-[opacity] duration-150": 1,
        "opacity-1": runState !== "finish",
        "opacity-0": runState === "finish",
    });

    return (
        <div className="absolute top-0 left-0 z-[10] w-full h-full flex justify-center items-center">
            <motion.div
                animate={{x: [500, 0, -500]}}
                className={classes}
                transition={{
                    ease: "linear",
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.5
                }}
            />
        </div>
    );
}

export default ProgressBgEffect;