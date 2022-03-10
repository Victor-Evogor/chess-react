import react,{useState} from "react";
import reactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import "./bootstrap.min.css";

window.react =react;
window.useState=useState;

reactDOM.render(<App/>,document.getElementById("root"));