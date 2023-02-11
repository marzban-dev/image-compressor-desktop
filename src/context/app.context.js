import React from "react";

const store = {
    inputDirectory: null,
    outputDirectory: null,
    compressionResult : null,
    runState : "idle",
    setInputDirectory: () => {},
    setOutputDirectory: () => {},
    setCompressionResult: () => {},
    setRunState: () => {},
};

const AppContext = React.createContext(store);

export default AppContext;