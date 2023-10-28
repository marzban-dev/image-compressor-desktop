const fs = require("fs-extra");
const path = require("path");
const { spawn } = require("child_process");

module.exports = {
    packagerConfig: {
        icon: "./src/assets/img/logo",
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {},
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {},
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {},
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-webpack",
            config: {
                mainConfig: "./webpack.main.config.js",
                renderer: {
                    config: "./webpack.renderer.config.js",
                    entryPoints: [
                        {
                            html: "./src/windows/home/index.html",
                            js: "./src/windows/home/renderer.js",
                            name: "main_window",
                            preload: {
                                js: "./src/windows/home/preload.js",
                            },
                        },
                        {
                            html: "./src/windows/splash/index.html",
                            js: "./src/windows/splash/renderer.js",
                            name: "splash_window",
                        },
                    ],
                },
            },
        },
    ],
    // To use external packages in build version, must add hooks : {...} to this config file.
    hooks: {
        readPackageJson: async (forgeConfig, packageJson) => {
            // only copy deps if there isn't any
            if (Object.keys(packageJson.dependencies).length === 0) {
                const originalPackageJson = await fs.readJson(
                    path.resolve(__dirname, "package.json")
                );
                const webpackConfigJs = require("./webpack.renderer.config.js");
                Object.keys(webpackConfigJs.externals).forEach((package) => {
                    packageJson.dependencies[package] = originalPackageJson.dependencies[package];
                });
            }
            return packageJson;
        },
        packageAfterPrune: async (forgeConfig, buildPath) => {
            console.log(buildPath);
            return new Promise((resolve, reject) => {
                const npmInstall = spawn("npm", ["install"], {
                    cwd: buildPath,
                    stdio: "inherit",
                    shell: true,
                });

                npmInstall.on("close", (code) => {
                    if (code === 0) {
                        resolve();
                    } else {
                        reject(new Error("process finished with error code " + code));
                    }
                });

                npmInstall.on("error", (error) => {
                    reject(error);
                });
            });
        },
    },
};
