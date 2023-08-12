import React, { Fragment } from "react";
import "../App.css";
import {
    TextField, 
    Typography, 
    Card, 
    CardContent
} from "@mui/material";
import ChatBubbleList from "./chatbubblelist";

const RoomMessages = (props) => {
    const {messages, chatName ,message, typingMsg} = props.props;

    return(
    <Fragment>
        <Card>
            <CardContent>
                <div className="chatList">
                    <ChatBubbleList
                        msg={messages}
                        client={chatName}
                    ></ChatBubbleList>
                </div>
            </CardContent>
        </Card>
        <TextField
            onChange={props.onMessageChange}
            placeholder="type something here"
            autoFocus={true}
            value={message}
            onKeyPress={e => (e.key === "Enter" ? props.handleSendMessage() : null)}
        />
        <Typography color="primary">{typingMsg}</Typography>
    </Fragment>
    );
};

export default RoomMessages;