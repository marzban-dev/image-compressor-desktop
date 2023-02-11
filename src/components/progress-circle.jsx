import React from "react";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

const ProgressCircle = ({progressPercentage}) => {
    return (
        <div className="w-[100px] h-[100px]">
            <CircularProgressbar
                value={progressPercentage}
                text={`${progressPercentage}%`}
                styles={buildStyles({
                    textSize: '16px',
                    pathColor: `rgb(39, 196, 153)`,
                    textColor: 'rgb(183,185,183)',
                    trailColor: 'rgba(34,59,51,0.8)'
                })}
            />;
        </div>
    );
}

export default ProgressCircle;