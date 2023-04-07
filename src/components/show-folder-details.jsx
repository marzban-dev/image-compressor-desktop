import React, { useContext, useEffect, useState } from "react";
import appContext from "../context/app.context";

const ShowFolderDetails = ({ name, path, icon, type }) => {
    const { setOutputDirectory, setInputDirectory } = useContext(appContext);
    const [directoryFilesCount, setDirectoryFilesCount] = useState(null);

    const getDirectoryFilesCount = async () => {
        const count = await window.electronAPI.getDirectoryFilesCount(path);
        setDirectoryFilesCount(count);
    };

    useEffect(() => {
        getDirectoryFilesCount();
    }, []);

    const clearDirectoryState = () => {
        if (type === "input") setInputDirectory(null);
        else setOutputDirectory(null);
    };

    return (
        <div className="relative w-full h-full flex justify-center items-center flex-col">
            <button
                className="text-[18px] absolute right-[10px] top-[10px]"
                onClick={clearDirectoryState}
            >
                ❌
            </button>
            <div className="flex justify-start items-center flex-col">
                <span className="text-[40px]">{icon}</span>
                <div>
                    <span className="text-[16px]">{name}</span>
                </div>
                {type === "input" && (
                    <div>
                        <span>Items : </span>
                        <span className="text-primary">{directoryFilesCount}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowFolderDetails;
