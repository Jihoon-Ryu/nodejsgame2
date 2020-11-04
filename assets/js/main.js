import "./login";
import "./notifications";
import "./sockets";

/* 1~3챕터까지의 내용
const socket = io("/");

//채팅발신

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You: ${message}`);
}

//채팅수신

socket.on("messageNotif", handleMessageNotif);

function handleMessageNotif(data) {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
}

//닉네임

function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}
*/