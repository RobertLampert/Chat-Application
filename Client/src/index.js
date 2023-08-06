import React from "react";
import { render } from "react-dom";

// import Project1Component from "./project 1/project1";
import { BrowserRouter as Router } from "react-router-dom";
import Project2Component from "./Project2Component";

render(
    <Router>
        <Project2Component />
    </Router>,
    document.querySelector("#root")
);