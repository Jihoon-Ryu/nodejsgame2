import events from "./events";

const socketController = (socket) => {
 /*login.js-logIn()에서 window.socket이 
 setNickname이벤트와 nickname받음*/   
 socket.on(events.setNickname, ({nickname}) => {
     socket.nickname = nickname;  
     socket.broadcast.emit(events.newUser, { nickname });
     //sockets.js로 broadcast: newUser이벤트, nickname보냄 
 });
};


export default socketController;