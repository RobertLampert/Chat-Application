import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import Project2Component from "./Components/Project2Component";

render(
    <Router>
        <Project2Component />
    </Router>,
    document.querySelector("#root")
);