import { disableChat, enableChat } from "./chat";
import { disableCanvas, enableCanvas, hideControls, showControls, resetCanvas } from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const countdownNo = document.getElementById("countdown");

const countdown = () => {
    let count = 10;
    let down;
    down = setInterval(() => {
        count = count -1;
        countdownNo.innerHTML = count;
        if(count <= 0) {
            clearInterval(down);  
            countdownNo.innerHTML = "";  
    } 
    }, 1000);
}



const addPlayers = (sockets) => {
    board.innerHTML = "";
    sockets.forEach(socket => {
      const playerElement = document.createElement("span");
      playerElement.innerText = `${socket.nickname}: ${socket.points}`
      board.appendChild(playerElement);
      console.log(sockets); })
}

//만약 초기화할 때 쓰고 싶은 말이 있으면 text로 표현
//만약 없으면 기본값으로 그냥 "" 아무것도 안씀
const setNotifis = (text) => {
  notifs.innerText = "";
  notifs.innerText = text;
}

export const handlePlayerUpdate = ({sockets}) => addPlayers(sockets);

//먼저
export const handleGameStarted = () => {
    //알림(You are a leader, paint: )초기화
    setNotifis("");
    //일반유저 그리기 못하게 하기
    disableCanvas();
    hideControls();
    //전에 리더였던 사람 채팅활성화
    enableChat();
    //남은 시간 카운트다운
    countdown();
};
//나중
export const handleLeaderNotif = ({word}) => {
    //리더는 그리기 가능하게
    enableCanvas();
    showControls();
    notifs.innerText =`You are the leader, paint: ${word}`;
    //리더는 채팅 불가
    disableChat();
}

export const handleGameEnded = () => {
    setNotifis("Game ended");
    disableCanvas();
    hideControls();
    resetCanvas();
};

export const handleGameStarting = () => setNotifis("Game will start soon");