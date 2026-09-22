import "./global.css";
import "./index.css";

import createHeader from "./components/Header/Header.js";
import createMain from "./components/Main/Main.js";

document.body.append(createHeader(), createMain());
