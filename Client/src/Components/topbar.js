import React from "react";
import Accessibility from "@mui/icons-material/Accessibility";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const TopBar = props => {
    const onIconClicked = () => props.viewDialog(); // notify the parent
    return (
        <AppBar position="static">
            <Toolbar color="primary" title="App Toolbar">
                <Typography variant="h6" color="inherit">
                    LiveSync
                </Typography>
                <section style={{ height: 90, width: 90, marginLeft: "auto" }}>
                {!props.display && (
                    <IconButton onClick={onIconClicked}>
                        <Accessibility style={{ color: "white", height: 70, width: 70 }} />
                    </IconButton>
                )}
                </section>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;