import React from "react";
import { List } from "@mui/material";
import ChatBubble from "./chatbubble";

const ChatBubbleList = props => {
  let messages = props.msg.map((msg, idx) => {
    return <ChatBubble key={idx} msg={msg} client={props.client} />;
  });
  return <List>{messages}</List>;
};

export default ChatBubbleList;
