import React from "react";
import "./App.css";
import {Box} from "@mui/material";
import Triangle from "./triangle";

const ChatMsg = props => {
  let msg = props.msg;
  return (
    <div className="scenario-message" 
      style={{ 
        backgroundColor: msg.colour, 
        position: "relative", width: "70%", 
        left: props.client === props.msg.from ? "30%" : "-9%",
        borderRadius: "7px"
        }}>
      <Box
        sx={{
          width: '100%',
          color: '#fff',
          '& > .MuiBox-root > .MuiBox-root': {
            p: 1,
            borderRadius: 1,
            fontSize: '0.875rem',
            fontWeight: '700'
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"from from room-time room-time""msg msg msg msg"`
          }}
        >
          <Box sx={{ gridArea: 'from'}}>{`${msg.from} says:`}</Box>
          <Box sx={{ gridArea: 'room-time', textAlign: 'right'}}>{`Room: ${msg.room}`}<br></br>{`@${msg.time}`}</Box>
          <Box sx={{ gridArea: 'msg'}}>{`${msg.text}`}</Box>
          <Triangle color={msg.colour} />
        </Box>
      </Box>
    </div>
  );
};

export default ChatMsg;
