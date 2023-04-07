import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppContext from "../context/app.context";

const ProgressTitle = ({ title }) => {
    const { compressionResult } = useContext(AppContext);

    const titleVariants = {
        init: {
            y: 10,
            opacity: 0,
        },
        exit: {
            y: -10,
            opacity: 0,
            transition: {
                y: {
                    duration: 0.1,
                },
                opacity: {
                    duration: 0.05,
                },
            },
        },
        enter: {
            y: 0,
            opacity: 1,
            transition: {
                y: {
                    duration: 0.05,
                },
                opacity: {
                    duration: 0.1,
                },
            },
        },
    };

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                variants={titleVariants}
                key={title}
                initial="init"
                animate="enter"
                exit="exit"
                className="text-white-20 text-[16px] whitespace-nowrap overflow-hidden overflow-ellipsis w-[300px] text-center"
            >
                {!compressionResult ? (
                    title ? (
                        title
                    ) : (
                        "------"
                    )
                ) : (
                    <span>
                        <span className="text-[rgb(243,110,110)] pr-1">
                            {compressionResult.inputSize}
                        </span>
                        👉
                        <span className="text-primary pl-1">{compressionResult.outputSize}</span>
                    </span>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default ProgressTitle;
