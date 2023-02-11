import React, {useContext, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import ProgressChart from "./progress-chart.jsx";
import ProgressCircle from "./progress-circle.jsx";
import ProgressTitle from "./progress-title.jsx";
import ProgressBgEffect from "./progress-bg-effect.jsx";
import BackButton from "./back-button.jsx";
import AppContext from "../context/app.context";

const Progress = () => {
    const {runState} = useContext(AppContext);
    const [progressDetails, setProgressDetails] = useState(null);

    useEffect(() => {
        window.electronAPI.handleUpdateProgression((e, compressionDetail) => {
            setProgressDetails(compressionDetail)
        });
    }, []);

    const progressPercentage = useMemo(() => {
        if (progressDetails) {
            const widthPercent = 100 / progressDetails.progress[0];
            return Math.round(progressDetails.progress[1] * widthPercent);
        }
        return 0;
    }, [progressDetails, runState]);

    const classes = classNames({
        "w-full h-screen bg-secondary-20 fixed z-1 left-0 transition-all duration-500": 1,
        "top-0 opacity-1": runState !== "idle",
        "top-[100%] opacity-0": runState === "idle",
    });

    const progressContainerClasses = classNames({
        "flex justify-center items-center flex-col gap-4 transition-all duration-[0.6s]": 1,
        "h-[60%]": runState !== "finish",
        "h-full w-full fixed top-0 left-0 scale-[1.2]": runState === "finish",
    })

    return (
        <div className={classes}>
            {runState === "finish" && <BackButton/>}

            <div className="absolute z-[20] flex justify-end items-center flex-col w-full h-full">
                <div className={progressContainerClasses}>
                    <ProgressCircle progressPercentage={progressPercentage}/>
                    <ProgressTitle title={progressDetails?.fileName}/>
                </div>

                <ProgressChart
                    chartData={progressDetails?.analyses}
                    biggestSize={progressDetails?.biggestSize}
                />
            </div>

            <ProgressBgEffect/>
        </div>
    )
}

export default Progress;