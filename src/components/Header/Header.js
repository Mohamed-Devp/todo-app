import "./Header.css";

import { createElement } from "../../utils.js";
import createLogo from "../../components/Logo/Logo.js";

import IconSun from "./icon-sun.svg";
import IconMoon from "./icon-moon.svg";

function createSwitch() {
    const iconSunImg = createElement("img", {
        className: "switch__icon switch__icon_theme_light",
        attrs: {
            src: IconSun,
            alt: "",
            title: "Switch to Light Theme",
        },
    });

    const iconMoonImg = createElement("img", {
        className: "switch__icon switch__icon_theme_dark",
        attrs: {
            src: IconMoon,
            alt: "",
            title: "Switch to Dark Theme",
        },
    });

    const switchBtn = createElement("button", {
        className: "switch switch_theme_light",
        children: [iconSunImg, iconMoonImg],
        attrs: {
            role: "switch",
            "aria-checked": "false",
            "aria-label": "Toggle Dark Theme",
        },
    });

    const switchTheme = () => {
        const root = document.documentElement;

        const current = root.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";

        root.setAttribute("data-theme", next);
        if (next === "light") {
            switchBtn.classList.remove("switch_theme_dark");
            switchBtn.classList.add("switch_theme_light");
        } else {
            switchBtn.classList.remove("switch_theme_light");
            switchBtn.classList.add("switch_theme_dark");
        }
    };

    const root = document.documentElement;
    root.setAttribute("data-theme", "light");

    switchBtn.addEventListener("click", switchTheme);

    return switchBtn;
}

export default function createHeader() {
    const logo = createLogo();
    const switchBtn = createSwitch();

    const header = createElement("header", {
        className: "header",
        children: [logo, switchBtn],
    });

    return header;
}
