export const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return 0

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['b', 'kb', 'mb', 'gb', 'tb']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));