import events from "./events";

/*
const socketController = socket => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    socket.on(events.setNickname, ({ nickname }) => {
      socket.nickname = nickname;
      broadcast(events.newUser, { nickname });
    });
    socket.on(events.disconnect, () => {
      broadcast(events.disconnected, { nickname: socket.nickname });
    });
  
    socket.on(events.sendMsg, ({ message }) => {
      broadcast(events.newMsg, { message, nickname: socket.nickname });
    });
};
*/
 
const socketController = (socket) => {
 //server.js 접속하면 자동발동  
 //login.js-logIn()에서 받음  
 socket.on(events.setNickname, ({nickname}) => {
     socket.nickname = nickname;  
     socket.broadcast.emit(events.newUser, { nickname });
     //sockets.js로 broadcast: newUser이벤트, nickname보냄 
 });
 socket.on(events.disconnect, () => {
     socket.broadcast.emit(events.disconnected, {nickname: socket.nickname});
     //sockets.js로 보냄
 })

 socket.on(events.sendMsg, ({message}) => {
     socket.broadcast.emit(events.newMsg, {message, nickname: socket.nickname});      
     //sockets.js로 보냄 
 });

  //그림판-그리기색 : paint.js에서 받음
  //모두 sockets.js로 보냄
  socket.on(events.beginPath, ({ x, y }) =>
    socket.broadcast.emit(events.beganPath, { x, y })
  );

  socket.on(events.strokePath, ({ x, y, color }) => {
    socket.broadcast.emit(events.strokedPath, { x, y, color });
  });
  //그림판-채우기색
  socket.on(events.fill, ({color}) => {
    socket.broadcast.emit(events.filled, { color })
  })
};


export default socketController;