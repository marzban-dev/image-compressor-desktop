const { promises: fsPromises, existsSync } = require("fs");
const path = require("path");
const sharp = require("sharp");
const { sleep } = require("../utils");
const { formatBytes } = require("../utils");

exports.getDirectoryFilesCount = async (e, directorPath) => {
    const files = await fsPromises.readdir(directorPath);
    return files.length;
};

exports.getDirectoryFiles = async (e, directorPath) => {
    return await fsPromises.readdir(directorPath);
};

exports.compressor = async (input, output, quality = 40, callback) => {
    let index = 1;
    let images = await this.getDirectoryFiles(null, input);
    let analyses = [];

    const calculateBiggestSize = async () => {
        const imageSizes = [];

        for (let image of images) {
            const imagePath = path.join(input, image);
            const imageStats = await fsPromises.stat(imagePath);
            const imageSize = imageStats.size;
            imageSizes.push(imageSize);
        }

        return imageSizes.reduce(
            (oldValue, imageSize) => (imageSize > oldValue ? imageSize : oldValue),
            0
        );
    };

    for (let image of images) {
        const fileExt = path.extname(image);
        const inputPath = path.join(input, image);

        const outputDefault = path.join(input, "..", "/output");
        const outputPath = output ? path.join(output, image) : path.join(outputDefault, image);

        if (!output && !existsSync(outputDefault)) {
            await fsPromises.mkdir(outputDefault);
        }

        try {
            let sharpObj = sharp(inputPath);

            switch (fileExt) {
                case ".jpg":
                    sharpObj = sharpObj.jpeg({ quality, mozjpeg: true });
                    break;
                case ".png":
                    sharpObj = sharpObj.png({ quality });
                    break;
            }

            await sharpObj.toFile(outputPath);

            const oldSize = (await fsPromises.stat(inputPath)).size;
            const newSize = (await fsPromises.stat(outputPath)).size;

            analyses.push({
                id: index,
                fileName: image,
                oldSize,
                newSize,
            });

            const biggestSize = await calculateBiggestSize();

            callback({
                fileName: image,
                oldSize,
                newSize,
                progress: [images.length, index],
                analyses,
                biggestSize,
            });

            index++;

            await sleep(10);
        } catch (e) {
            console.log("ERROR", e);
        }
    }

    const inputSize = formatBytes(analyses.reduce((total, { oldSize }) => total + oldSize, 0));
    const outputSize = formatBytes(analyses.reduce((total, { newSize }) => total + newSize, 0));

    return {
        inputSize,
        outputSize,
        difference: inputSize - outputSize,
    };
};
