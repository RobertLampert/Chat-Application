import React, { Fragment } from "react";
import "../App.css";
import {
    Button, 
    TextField, 
    Typography, 
    Card, 
    CardHeader, 
    CardContent, 
    Radio, 
    RadioGroup,
    FormControl, 
    FormControlLabel
  } from "@mui/material";
  import logo from "../logo.png";

const Login = (props) => {
    const {chatName, nameStatus, radioValue, roomName, roomStatus, rooms} = props.props;

    return(
    <Fragment>
        <Typography style={{ textAlign: "center" }}>
            <img src={logo} alt="globe" />
        </Typography>
        <h3 style={{ textAlign: 'center', fontSize: 24, color: "rgba(4, 66, 45, 0.89)" }}>Sign In</h3>
        <Card>
            <CardHeader title="Create Chat Name" style={{ textAlign: "center", color: "rgba(4, 66, 45, 0.89)" }} />
            <CardContent>
                <TextField
                    onChange={props.onNameChange}
                    placeholder="Enter Unique Chat Name"
                    autoFocus={true}
                    required
                    value={chatName}
                    error={nameStatus !== ""}
                    helperText={nameStatus}
                />
            </CardContent></Card>
        <p></p>
        <Card>
            <CardHeader title="Create New Room or Join Existing" style={{ textAlign: "center", color: "rgba(4, 66, 45, 0.89)" }} />
            <CardContent>
                <FormControl>
                    <RadioGroup
                        aria-label="radio"
                        defaultValue="Main"
                        value={radioValue}
                        name="rooms"
                        onChange={props.handleRadioChange}
                    >
                        {rooms.map((room, idx) => {
                            return (
                                <FormControlLabel
                                    key={idx}
                                    value={room}
                                    control={<Radio />}
                                    label={room}
                                    onClick={props.createRadioButtons}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
                <br></br>
                <TextField
                    onChange={props.onRoomChange}
                    placeholder="Enter Unique Room Name"
                    autoFocus={true}
                    required
                    value={roomName}
                    error={roomStatus !== ""}
                    helperText={roomStatus}
                />
            </CardContent>
        </Card>
        <p></p>
        <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "3%" }}
            onClick={() => props.handleJoin()}
            disabled={chatName === "" || roomName === ""}
        >
            Join
        </Button>
    </Fragment>
    );
};

export default Login;