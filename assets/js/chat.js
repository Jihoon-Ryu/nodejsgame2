import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

// send

const appendMsg = (text, nickname) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="author ${nickname ? "out" : "self"}">${nickname ? nickname : "You"}:</span> ${text}`;
    messages.appendChild(li);
};

const handleSendMsg = (event) => {
    event.preventDefault();
    const input = sendMsg.querySelector("input");
    const { value } = input;
    window.socket.emit(window.events.sendMsg, { message: value });
    //socketController로 보냄
    input.value = "";
    appendMsg(value);
};


// receive

export const handleNewMessage = ({message, nickname}) => appendMsg(message, nickname);

// init 선정의후호출 

if(sendMsg) {
    sendMsg.addEventListener("submit", handleSendMsg);
};