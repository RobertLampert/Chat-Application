import React, { useReducer, useEffect } from "react";
import io from "socket.io-client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import TopBar from "./topbar";
import OnlineUsers from "./OnlineUsers";
import Login from "./Login";
import RoomMessages from "./RoomMessages";

const Project2Component = () => {
  const initialState = {
    messages: [],
    rooms: [],
    onlineUsers: [],
    nameStatus: "",
    roomStatus: "",
    radio: "",
    radioValue: "",
    showjoinfields: true,
    alreadyexists: false,
    chatName: "",
    roomName: "",
    typingMsg: "",
    isTyping: false,
    isOpen: false
  };
  
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const onWelcome = dataFromServer => {
    addMessage(dataFromServer);
    setState({ showjoinfields: false, alreadyexists: false });
  };

  const onDuplicateName = dataFromServer => {
    setState({ nameStatus: dataFromServer, chatName: "" });
  };

  const onTyping = dataFromServer => {
    if (dataFromServer.from !== state.chatName) {
      setState({
        typingMsg: dataFromServer.text
      });
    }
  };

  const onNewMessage = dataFromServer => {
    addMessage(dataFromServer);
    setState({ typingMsg: "", message: "" });
  };

  useEffect(() => {
    serverConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serverConnect = () => {
    // connect to server
    const socket = io.connect("localhost:5000", { forceNew: true });
    socket.on("nameexists", onDuplicateName);
    socket.on("welcome", onWelcome);
    socket.on("someonejoined", addMessage);
    socket.on('someoneleft', addMessage);
    socket.on("someoneistyping", onTyping);
    socket.on("newmessage", onNewMessage);
    socket.on("roomlist", roomNameList);
    socket.on("getusers", setOnlineUsers);
    setState({ socket: socket, nameStatus: "Enter a Chat Name", roomStatus: "Enter a New Room Name", chatName: "", roomName: "" });
  };

  // generic handler for all messages:
  const addMessage = dataFromServer => {
    let messages = state.messages;
    messages.push(dataFromServer);
    setState({ messages: messages });
  };

  const roomNameList = (dataFromServer) => {
    setState({ rooms: dataFromServer });
  };

  const setOnlineUsers = (dataFromServer) => {
    setState({ onlineUsers: dataFromServer });
  };

  // button click handler for join button
  const handleJoin = () => {
    state.socket.emit("join", {
        chatName: state.chatName,
        roomName: state.roomName
    });
  };

  // handler for name TextField entry
  const onNameChange = e => {
    setState({ chatName: e.target.value, nameStatus: "" });
    if(e.target.value === ""){
      setState({ nameStatus: "Enter a Chat Name" });
    };
  };

  const onRoomChange = (e) => {
    setState({ roomName: e.target.value, roomStatus: "", radioValue: "" });
    if(e.target.value === ""){
      setState({ roomStatus: "Enter a New Room Name" });
    };
  };

  // keypress handler for message TextField
  const onMessageChange = e => {
      setState({ message: e.target.value });
      if (state.isTyping === false) {
          state.socket.emit("typing", { from: state.chatName }, err => { });
          setState({ isTyping: true }); // only first byte
      }
  };

    // enter key handler to send message
    const handleSendMessage = e => {
        if (state.message !== "") {
            state.socket.emit(
                "message",
                { from: state.chatName, text: state.message },
                err => { }
            );
            setState({ isTyping: false });
        }
    };

    const handleRadioChange = (event) => {
      setState({radio: event.target.value});
    };

    const createRadioButtons = (e) => {
      setState({ roomName: e.target.value, roomStatus: "", radioValue: e.target.value });
    };

    const handleOpenDialog = () => {
      state.socket.emit(
        "onlineusers"
      );
      setState({ isOpen: true });
    };
    
  return (
    <ThemeProvider theme={theme}>
      <div>
        <TopBar viewDialog={handleOpenDialog} display={state.showjoinfields} />
        <OnlineUsers props={state} closeFunc={() => setState({ isOpen: false })} />
      </div>
      <br></br>
      {state.showjoinfields && (
        <Login 
          props={state}
          onNameChange = {onNameChange}
          onRoomChange = {onRoomChange}
          handleRadioChange = {handleRadioChange}
          handleJoin = {handleJoin}
          setState = {setState}
          createRadioButtons = {createRadioButtons}
        />
      )}
      {!state.showjoinfields && (
        <RoomMessages 
        props={state}
        onMessageChange = {onMessageChange}
        handleSendMessage = {handleSendMessage}
        />
      )}
    </ThemeProvider>
  );
};

export default Project2Component;
