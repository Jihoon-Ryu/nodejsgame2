import events from "./events";
import { chooseWord } from "./words";

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
}; */

//Def

let inProgress = false;
let word = null;
let leader = null;
let sockets = [];
//setNickname~in, disconncect~out

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

//

const socketController = (socket, io) => {

 const startGame = () => {
  if (inProgress === false){
    //game is on
    inProgress = true;
    //leader, word 결정
    leader = chooseLeader();
    word = chooseWord();
    io.emit(events.gameStarting)   
    setTimeout(() => {
      //모든 유저 그리기 비활성화
      io.emit(events.gameStarted);
      //리더에게 word알리고 그리기 활성화
      io.to(leader.id).emit(events.leaderNotif, { word });      
  }, 3000);
 } };

 const endGame = () => {
  inProgress = false;
  io.emit(events.gameEnded);
 }

 const addPoints = (id) => {
  sockets = sockets.map(sockets_ele => {
    if (sockets_ele.id === id) {
      sockets_ele.points += 10;
    }
    return sockets_ele;
  });
  io.emit(events.playerUpdate, { sockets });
  endGame();
};

 //const superBroadcast = ( event, data ) => io.emit(event, data);
 //server.js 접속하면 자동발동  
 //login.js-logIn()에서 받음  
 socket.on(events.setNickname, ({nickname}) => {
     socket.nickname = nickname;  
     sockets.push({id: socket.id, points: 0, nickname: nickname});
     socket.broadcast.emit(events.newUser, { nickname });
     //sockets.js로 broadcast: newUser이벤트, nickname보냄 
     io.emit(events.playerUpdate, { sockets });
     //유저 정보 업데이트    
     if (sockets.length === 2) { startGame(); } 
     //인원이 2명 이상이면 게임 시작
    });
    
 socket.on(events.disconnect, () => {
     sockets = sockets.filter(sockets_ele => sockets_ele.id !== socket.id);
     //나가는 애 socket는 sockets[ ]에서 빼
     if(sockets.length === 1) {
       endGame();
     } else if (leader) {
       if (socket.id === leader.id) { endGame() };
     };
     //유저가 1사람만 남거나 리더 나가면 게임 끝냄
     socket.broadcast.emit(events.disconnected, {nickname: socket.nickname});
     //sockets.js로 보냄
     io.emit(events.playerUpdate, { sockets });
     //유저 정보 업데이트  
    })
 
 //chat.js에서 emit받음   
 socket.on(events.sendMsg, ({message}) => {
     if(message === word) {
     io.emit(events.newMsg, {
       message: `Winner is ${socket.nickname}, word was : ${word}`,
       nickname: "Bot"
     });
     addPoints(socket.id);  
     } else {
      socket.broadcast.emit(events.newMsg, {message, nickname: socket.nickname});      
      //sockets.js로 보냄 
     }
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