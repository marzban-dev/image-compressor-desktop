/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
    theme: {
        extend: {},
        backgroundImage: {
            "progress": "linear-gradient(to right,rgba(0,0,0,0),rgba(39,196,153,0.3),rgba(0,0,0,0))"
        },
        colors: {
            transparent: "rgba(0,0,0,0)",
            primary: {
                DEFAULT: "rgb(39,196,153)",
                dark: "rgb(34,59,51)",
                transparent: "rgba(34,59,51,0.8)",
                bright: "rgb(245,252,251)"
            },
            secondary: {
                10: "rgb(15,19,17)",
                20: "rgb(34,36,35)",
                transparent: "rgba(15,19,17,0.6)",
                blur: "rgb(28,33,33)"
            },
            white: {
                10: "rgb(253,253,253)",
                20: "rgb(183,185,183)",
                30: "rgb(90,90,90,0.4)",
                transparent: "rgba(255,255,255,0.1)"
            }
        }
    },
    plugins: [],
}