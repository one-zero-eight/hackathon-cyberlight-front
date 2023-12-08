import { addDynamicIconSelectors } from "@iconify/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        dark: {
          100: "#C9C9C9",
          200: "#b8b8b8",
          300: "#828282",
          400: "#696969",
          500: "#424242",
          600: "#3b3b3b",
          700: "#2e2e2e",
          800: "#242424",
          900: "#1f1f1f",
          950: "#141414",
        },
        gray: {
          100: "#f8f9fa",
          200: "#f1f3f5",
          300: "#e9ecef",
          400: "#dee2e6",
          500: "#ced4da",
          600: "#adb5bd",
          700: "#868e96",
          800: "#495057",
          900: "#343a40",
          950: "#212529",
        },
        red: {
          100: "#fff5f5",
          200: "#ffe3e3",
          300: "#ffc9c9",
          400: "#ffa8a8",
          500: "#ff8787",
          600: "#ff6b6b",
          700: "#fa5252",
          800: "#f03e3e",
          900: "#e03131",
          950: "#c92a2a",
        },
        pink: {
          100: "#fff0f6",
          200: "#ffdeeb",
          300: "#fcc2d7",
          400: "#faa2c1",
          500: "#f783ac",
          600: "#f06595",
          700: "#e64980",
          800: "#d6336c",
          900: "#c2255c",
          950: "#a61e4d",
        },
        grape: {
          100: "#f8f0fc",
          200: "#f3d9fa",
          300: "#eebefa",
          400: "#e599f7",
          500: "#da77f2",
          600: "#cc5de8",
          700: "#be4bdb",
          800: "#ae3ec9",
          900: "#9c36b5",
          950: "#862e9c",
        },
        violet: {
          100: "#f3f0ff",
          200: "#e5dbff",
          300: "#d0bfff",
          400: "#b197fc",
          500: "#9775fa",
          600: "#845ef7",
          700: "#7950f2",
          800: "#7048e8",
          900: "#6741d9",
          950: "#5f3dc4",
        },
        indigo: {
          100: "#edf2ff",
          200: "#dbe4ff",
          300: "#bac8ff",
          400: "#91a7ff",
          500: "#748ffc",
          600: "#5c7cfa",
          700: "#4c6ef5",
          800: "#4263eb",
          900: "#3b5bdb",
          950: "#364fc7",
        },
        blue: {
          100: "#e7f5ff",
          200: "#d0ebff",
          300: "#a5d8ff",
          400: "#74c0fc",
          500: "#4dabf7",
          600: "#339af0",
          700: "#228be6",
          800: "#1c7ed6",
          900: "#1971c2",
          950: "#1864ab",
        },
        cyan: {
          100: "#e3fafc",
          200: "#c5f6fa",
          300: "#99e9f2",
          400: "#66d9e8",
          500: "#3bc9db",
          600: "#22b8cf",
          700: "#15aabf",
          800: "#1098ad",
          900: "#0c8599",
          950: "#0b7285",
        },
        teal: {
          100: "#e6fcf5",
          200: "#c3fae8",
          300: "#96f2d7",
          400: "#63e6be",
          500: "#38d9a9",
          600: "#20c997",
          700: "#12b886",
          800: "#0ca678",
          900: "#099268",
          950: "#087f5b",
        },
        green: {
          100: "#ebfbee",
          200: "#d3f9d8",
          300: "#b2f2bb",
          400: "#8ce99a",
          500: "#69db7c",
          600: "#51cf66",
          700: "#40c057",
          800: "#37b24d",
          900: "#2f9e44",
          950: "#2b8a3e",
        },
        lime: {
          100: "#f4fce3",
          200: "#e9fac8",
          300: "#d8f5a2",
          400: "#c0eb75",
          500: "#a9e34b",
          600: "#94d82d",
          700: "#82c91e",
          800: "#74b816",
          900: "#66a80f",
          950: "#5c940d",
        },
        yellow: {
          100: "#fff9db",
          200: "#fff3bf",
          300: "#ffec99",
          400: "#ffe066",
          500: "#ffd43b",
          600: "#fcc419",
          700: "#fab005",
          800: "#f59f00",
          900: "#f08c00",
          950: "#e67700",
        },
        orange: {
          100: "#fff4e6",
          200: "#ffe8cc",
          300: "#ffd8a8",
          400: "#ffc078",
          500: "#ffa94d",
          600: "#ff922b",
          700: "#fd7e14",
          800: "#f76707",
          900: "#e8590c",
          950: "#d9480f",
        },
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
  darkMode: ["class", "[data-mantine-color-scheme='dark']"],
};
export default config;
