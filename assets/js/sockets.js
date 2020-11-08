import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";
import { handleBeganPath, handleStrokedPath, handleFilled } from "./paint";
import { handlePlayerUpdate, handleGameStarted, handleLeaderNotif, handleGameEnded, handleGameStarting } from "./players";
/*
let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => (socket = aSocket);

export const initSockets = (aSocket) => {
    const { events } = window;
    updateSocket(aSocket);
    aSocket.on(events.newUser, handleNewUser);
    aSocket.on(events.disconnected, handleDisconnected);
    aSocket.on(events.newMsg, handleNewMessage);
};
*/

export const initSockets = () => {
 //login()에서 실행됨
 //login() => socketController에서 broadcast받음

 window.socket.on(window.events.newUser, handleNewUser);
 //=>"nickname just joined"

 window.socket.on(window.events.disconnected, handleDisconnected);
 //=>"nickname just left"

 window.socket.on(window.events.newMsg, handleNewMessage );
 //=>채팅창에 채팅내용 표시

 //그림판-그리기색 
 window.socket.on(window.events.beganPath, handleBeganPath);
 window.socket.on(window.events.strokedPath, handleStrokedPath);
 //그림판-채우기색
 window.socket.on(window.events.filled, handleFilled);

 //유저정보 업데이트
 window.socket.on(window.events.playerUpdate, handlePlayerUpdate);

 //"게임이 곧 시작"
 window.socket.on(window.events.gameStarting, handleGameStarting);

 //게임시작 
 window.socket.on(window.events.gameStarted, handleGameStarted);

 //리더
 window.socket.on(window.events.leaderNotif, handleLeaderNotif);

 //게임 끝
 window.socket.on(window.events.gameEnded, handleGameEnded);
}; 