import React, { useReducer, useEffect, Fragment } from "react";
import io from "socket.io-client";
import { ThemeProvider } from "@mui/material/styles";
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
  FormControlLabel, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper
} from "@mui/material";
import theme from "./theme";
import ChatBubbleList from "./chatbubblelist";
import TopBar from "./topbar";
import logo from "./logo.png";
// import user from "./user.png";
import PortraitIcon from '@mui/icons-material/Portrait';

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

  const onExists = dataFromServer => {
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
    socket.on("nameexists", onExists);
    socket.on("welcome", onWelcome);
    socket.on("someonejoined", addMessage);
    socket.on('someoneleft', addMessage);
    socket.on("someoneistyping", onTyping);
    socket.on("newmessage", onNewMessage);
    socket.on("roomlist", roomArr);
    socket.on("getusers", onlineUsersArr);
    setState({ socket: socket, nameStatus: "Enter a Chat Name", roomStatus: "Enter a New Room Name", chatName: "", roomName: "" });
  };

  // generic handler for all messages:
  const addMessage = dataFromServer => {
    let messages = state.messages;
    messages.push(dataFromServer);
    setState({ messages: messages });
  };

  const roomArr = (dataFromServer) => {
    setState({ rooms: dataFromServer });
  };

  const onlineUsersArr = (dataFromServer) => {
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

    const handleOpenDialog = () => {
      state.socket.emit(
        "onlineusers"
      );
      setState({ isOpen: true });
    };
    const handleCloseDialog = () => setState({ isOpen: false });
    
  return (
    <ThemeProvider theme={theme}>
      <div>
        <TopBar viewDialog={handleOpenDialog} display={state.showjoinfields} />
        <Dialog open={state.isOpen} onClose={handleCloseDialog} style={{ margin: 20 }}>
          <DialogTitle style={{ textAlign: "center" }}>Who's On?</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a table">
                <TableBody>
                {state.onlineUsers.map((user, idx) => {
                  return(
                    <TableRow key={idx}>
                      <TableCell>
                        <PortraitIcon style = {{
                          color: user.colour,
                          borderRadius: 25,
                          marginRight: "15px"
                      }}/>
                      </TableCell>
                      <TableCell> {user.name} is in the {state.roomName} room</TableCell>
                    </TableRow>
                  );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </div>
      <br></br>
      {state.showjoinfields && (
        <Fragment>
          <Typography style={{ textAlign: "center" }}>
            <img src={logo} alt="globe" />
          </Typography>
          <h3 style={{ textAlign: 'center',  fontSize: 24, color: "rgba(4, 66, 45, 0.89)" }}>Sign In</h3>
          <Card>
          <CardHeader title="Create Chat Name" style={{ textAlign: "center", color: "rgba(4, 66, 45, 0.89)" }} />
            <CardContent>
            <TextField
              onChange={onNameChange}
              placeholder="Enter Unique Chat Name"
              autoFocus={true}
              required
              value={state.chatName}
              error={state.nameStatus !== ""}
              helperText={state.nameStatus}
            />
          </CardContent></Card>
          <p></p>
          <Card>
            <CardHeader title="Create New Room or Join Existing" style={{ textAlign: "center", color: "rgba(4, 66, 45, 0.89)" }} />
            <CardContent>
              <FormControl>
              <RadioGroup
                aria-label="room"
                defaultValue="Main"
                value={state.radioValue}
                name="rooms"
                onChange={handleRadioChange}
              >
                {state.rooms.map((room, idx) => {
                  return(
                  <FormControlLabel
                    key = {idx}
                    value={room}
                    control={<Radio />}
                    label={room}
                    // labelPlacement="top"
                    onClick={(e) => {
                      setState({ roomName: e.target.value, roomStatus: "", radioValue: room });
                    }}
                  />
                  );
                })}
              </RadioGroup>
              </FormControl>
              <br></br>
              <TextField
                onChange={onRoomChange}
                placeholder="Enter Unique Room Name"
                autoFocus={true}
                required
                value={state.roomName}
                error={state.roomStatus !== ""}
                helperText={state.roomStatus}
              />
            </CardContent>
          </Card>
          <p></p>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "3%" }}
            onClick={() => handleJoin()}
            disabled={state.chatName === "" || state.roomName === ""}
          >
            Join
          </Button>
        </Fragment>
      )}
      {!state.showjoinfields && (
        <Fragment>
          <Card>
            <CardContent>
            <div className="chatList">
              <ChatBubbleList
                msg={state.messages}
                client={state.chatName}
              ></ChatBubbleList>
            </div>
            </CardContent>
          </Card>
          <TextField
            onChange={onMessageChange}
            placeholder="type something here"
            autoFocus={true}
            value={state.message}
            onKeyPress={e => (e.key === "Enter" ? handleSendMessage() : null)}
          />
            <Typography color="primary">{state.typingMsg}</Typography>
        </Fragment>
      )}
    </ThemeProvider>
  );
};

export default Project2Component;
