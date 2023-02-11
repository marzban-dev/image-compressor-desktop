import React, {useContext} from "react";
import ProgressChartBar from "./progress-chart-bar.jsx";
import {motion, AnimatePresence} from "framer-motion";
import AppContext from "../context/app.context";

const ProgressChart = ({chartData, biggestSize}) => {
    const {runState} = useContext(AppContext)

    const chartVariants = {
        hide: {
            opacity: 0,
            y: 100,
            transition: {
                opacity: {
                    duration: 0.4
                },
                y: {
                    duration: 0.5
                }
            }
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                opacity: {
                    duration: 0.5
                },
                y: {
                    duration: 0.4
                }
            }
        }
    }

    const renderChartBars = () => {
        if (chartData) {
            const onePercentOfBarHeight = biggestSize / 100;

            return chartData.map(({oldSize, newSize}) => {
                const oldSizeBarHeight = Math.round(oldSize / onePercentOfBarHeight + 8) + "%";
                const newSizeBarHeight = Math.round(newSize / onePercentOfBarHeight + 8) + "%";

                return (
                    <ProgressChartBar newSizeBarHeight={newSizeBarHeight} oldSizeBarHeight={oldSizeBarHeight}/>
                )
            });
        }

        return null;
    }

    return (
        <AnimatePresence>
            {runState === "running" && (
                <motion.div
                    variants={chartVariants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    className="w-[95%] h-[40%] backdrop-blur-xl bg-secondary-transparent overflow-hidden rounded-xl mb-4"
                >
                    <div className="w-full h-full flex justify-end items-start flex-nowrap gap-1 overflow-x-scroll hide-scrollbar pr-4">
                        {renderChartBars()}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ProgressChart;