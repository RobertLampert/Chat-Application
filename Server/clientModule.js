const Colours = require("./Colours.json");

let users = [`Admin`];
let rooms = [`Main`];
let colours = { Admin: "#1843a8" };
let onlineList = {
    Main: [],
};

const getAdminName = () => {
    return users[0];
};

const getAdminColour = () => {
    return colours[users[0]];
};

const addUsers = (clientName, roomName) => {
    // add user name to list of users

    let userColour =
      Colours.colours[
        Math.floor(Math.random() * Colours.colours.length) + 1
      ];
    users.push(clientName);
    colours[clientName] = userColour;
  
    let list = onlineList[roomName];
    let payload = { name: clientName, colour: userColour };
  
    if (list === undefined) {
      onlineList[roomName] = [];
      onlineList[roomName].push(payload);
    } else {
      list.push(payload);
      onlineList[roomName] = list;
    }
};

const getUserColour = (user) => {
    return colours[user];
};

const doesUserExist = (user) => {
    return users.includes(user);
};

const getUsers = (roomName) => {
    return onlineList[roomName];
};

const getRooms = () => {
    return rooms;
};

const removeUser = (name, room) => {
    users = users.filter(deleteUser => deleteUser !== name);
    onlineList[room] = onlineList[room].filter(removeUserFromRoom => removeUserFromRoom.name !== name); 
    return users;
};

const addRoom = (newRoom) => {
    if(rooms.includes(newRoom)){
        return;
    }else{
        rooms.push(newRoom);
        return;
    }
};

module.exports = {
    addUsers,
    doesUserExist,
    getUsers,
    getRooms,
    removeUser,
    getAdminName,
    getAdminColour,
    getUserColour,
    addRoom
};