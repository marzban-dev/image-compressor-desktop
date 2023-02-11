import React, {Fragment, useState} from "react";
import {motion} from "framer-motion";

const ProgressChartBar = ({oldSizeBarHeight, newSizeBarHeight}) => {

    const chartBarVariants = {
        hide: {
            opacity: 0,
            x: 20
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.35
            }
        }
    }

    return (
        <motion.div
            className="min-w-[8px] w-[8px] h-full flex justify-center items-end relative"
            variants={chartBarVariants}
            initial="hide"
            animate="show"
            layout
        >
            <div className="w-full bg-primary-transparent rounded-tr-sm rounded-tl-sm" style={{height: oldSizeBarHeight}}></div>
            <div className="w-full bg-primary absolute bottom-0 left-0 rounded-tr-sm rounded-tl-sm" style={{height: newSizeBarHeight}}></div>
        </motion.div>
    )
}

export default ProgressChartBar;