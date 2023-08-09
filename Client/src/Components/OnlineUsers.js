import React from "react";
import "../App.css";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableRow,
    TableCell,
  } from "@mui/material";
import PortraitIcon from '@mui/icons-material/Portrait';


const OnlineUsers = props => {
    const {isOpen, onlineUsers ,roomName} = props.props;

    return (
        <Dialog open={isOpen} onClose={props.closeFunc} style={{ margin: 20 }}>
        <DialogTitle style={{ textAlign: "center" }}>Who's On?</DialogTitle>
        <DialogContent>
            <Table size="small" aria-label="online user table">
              <TableBody>
              {onlineUsers.map((user, idx) => {
                return(
                  <TableRow key={idx}>
                    <TableCell>
                      <PortraitIcon style = {{
                        color: user.colour,
                        borderRadius: 25,
                        marginRight: "15px"
                    }}/>
                    </TableCell>
                    <TableCell> {user.name} is in the {roomName} room</TableCell>
                  </TableRow>
                );
                })}
              </TableBody>
            </Table>
        </DialogContent>
      </Dialog>
    );
};

export default OnlineUsers;