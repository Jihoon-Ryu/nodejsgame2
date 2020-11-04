import { handleNewUser } from "./notifications";


//export const getSocket = () => window.socket;

export const initSockets = () => {
 //login()에서 실행됨
 //login() => socketController에서 broadcast받음
 window.socket.on(window.events.newUser, handleNewUser);
 //=>"nickname just joined"
}