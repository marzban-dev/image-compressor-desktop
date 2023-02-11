import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from "./app.jsx";
import AppContext from "./context/app.context";
import {useState} from "react";

const AppWrapper = () => {
    const [inputDirectory, setInputDirectory] = useState(null);
    const [outputDirectory, setOutputDirectory] = useState(null);
    const [compressionResult, setCompressionResult] = useState(null);
    const [runState, setRunState] = useState("idle");

    return (
        <AppContext.Provider
            value={{
                inputDirectory,
                setInputDirectory,
                outputDirectory,
                setOutputDirectory,
                compressionResult,
                setCompressionResult,
                runState,
                setRunState
            }}
        >
            <App/>
        </AppContext.Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<AppWrapper/>);