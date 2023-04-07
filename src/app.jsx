import classNames from "classnames";
import React, { useContext, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Progress from "./components/progress.jsx";
import ShowFolderDetails from "./components/show-folder-details.jsx";
import StartButton from "./components/start-button.jsx";
import AppContext from "./context/app.context";

const App = () => {
    const {
        inputDirectory,
        outputDirectory,
        runState,
        setRunState,
        setInputDirectory,
        setOutputDirectory,
    } = useContext(AppContext);

    const [isInputAreaActive, setIsInputAreaActive] = useState(false);
    const [isOutputAreaActive, setIsOutputAreaActive] = useState(false);

    const inputDropArea = useRef(null);
    const outputDropArea = useRef(null);

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const checkAndSetupDraggedDirectory = async (e, type) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 1) {
            toast("Drag just one file", {
                icon: "ℹ️",
            });
        } else {
            const uploadedFolder = files[0];
            const count = await window.electronAPI.getDirectoryFilesCount(uploadedFolder.path);

            if (!uploadedFolder.name.includes(".")) {
                if (type === "input") {
                    if (count !== 0) {
                        setInputDirectory({
                            name: uploadedFolder.name,
                            path: uploadedFolder.path,
                        });
                    } else {
                        toast("This folder is empty", {
                            icon: "ℹ️",
                        });
                    }
                } else {
                    if (count === 0) {
                        setOutputDirectory({
                            name: uploadedFolder.name,
                            path: uploadedFolder.path,
                        });
                    } else {
                        toast("Please upload an empty folder", {
                            icon: "ℹ️",
                        });
                    }
                }
            } else {
                toast("Please upload a folder", {
                    icon: "ℹ️",
                });
            }
        }
    };

    // Input area events
    const onInputAreaDragOver = (e) => {
        preventDefaults(e);
        setIsInputAreaActive(true);
    };

    const onInputAreaDragEnter = (e) => {
        preventDefaults(e);
        setIsInputAreaActive(true);
    };

    const onInputAreaDragLeave = (e) => {
        preventDefaults(e);
        setIsInputAreaActive(false);
    };

    const onInputAreaDrop = (e) => {
        preventDefaults(e);
        setIsInputAreaActive(false);
        checkAndSetupDraggedDirectory(e, "input");
    };

    // Output area events
    const onOutputAreaDragOver = (e) => {
        preventDefaults(e);
        setIsOutputAreaActive(true);
    };

    const onOutputAreaDragEnter = (e) => {
        preventDefaults(e);
        setIsOutputAreaActive(true);
    };

    const onOutputAreaDragLeave = (e) => {
        preventDefaults(e);
        setIsOutputAreaActive(false);
    };

    const onOutputAreaDrop = async (e) => {
        preventDefaults(e);
        setIsOutputAreaActive(false);
        checkAndSetupDraggedDirectory(e, "output");
    };

    const classes = {
        base: "border-2 border-dashed flex justify-center items-center w-full h-full rounded-lg transition-colors",
        active: "bg-primary-transparent border-primary text-primary",
        idle: "bg-transparent border-white-20 text-white-20",
    };

    const inputAreaClasses = classNames({
        [classes.base]: 1,
        [classes.active]: isInputAreaActive,
        [classes.idle]: !isInputAreaActive,
    });

    const outputAreaClasses = classNames({
        [classes.base]: 1,
        [classes.active]: isOutputAreaActive,
        [classes.idle]: !isOutputAreaActive,
    });

    return (
        <div className="bg-secondary-20 p-4 h-screen">
            <div className="flex justify-center items-center gap-8 h-[70%]">
                <div
                    onDragOver={!inputDirectory && onInputAreaDragOver}
                    onDragEnter={!inputDirectory && onInputAreaDragEnter}
                    onDragLeave={!inputDirectory && onInputAreaDragLeave}
                    onDrop={!inputDirectory && onInputAreaDrop}
                    className={inputAreaClasses}
                    ref={inputDropArea}
                >
                    {!inputDirectory && <span>Drop Input</span>}
                    {inputDirectory && (
                        <ShowFolderDetails
                            icon="📥"
                            type="input"
                            path={inputDirectory.path}
                            name={inputDirectory.name}
                        />
                    )}
                </div>

                <div
                    onDragOver={!outputDirectory && onOutputAreaDragOver}
                    onDragEnter={!outputDirectory && onOutputAreaDragEnter}
                    onDragLeave={!outputDirectory && onOutputAreaDragLeave}
                    onDrop={!outputDirectory && onOutputAreaDrop}
                    className={outputAreaClasses}
                    ref={outputDropArea}
                >
                    {!outputDirectory && (
                        <div className="relative flex justify-center items-center flex-col">
                            <span>Drop Output</span>
                            <div className="top-[30px] absolute whitespace-nowrap text-[14px] text-[rgb(126,126,126)]">
                                default : /output
                            </div>
                        </div>
                    )}
                    {outputDirectory && (
                        <ShowFolderDetails
                            icon="📤"
                            type="output"
                            path={outputDirectory.path}
                            name={outputDirectory.name}
                        />
                    )}
                </div>
            </div>
            <div className="h-[30%] flex justify-center items-end">
                <StartButton />
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: "rgb(15,19,17)",
                        color: "rgb(183,185,183)",
                    },
                }}
            />
            <Progress />
        </div>
    );
};

export default App;
