import { initSockets } from "./sockets";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");
const nickname = localStorage.getItem("nickname");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const logIn = (nickname) => {
  //socket접속
  //window를 이용해 socket을 전역변수화
  window.socket = io("/");
  //그 접속자 본인에게 setNickName이벤트와 nickname 데이터 전송
  //socketController로 보냄
  window.socket.emit(window.events.setNickname, { nickname });
  //socket.js
  initSockets();
}

//로그인 / 로그아웃 display

if (nickname === null) {
 body.className = LOGGED_OUT;
} else {
 body.className = LOGGED_IN;
 logIn(nickname);
}

//로그인하면


const handleFormSubmit = (e) => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  localStorage.setItem("nickname", value);
  body.className = LOGGED_IN;
  logIn(value);
 }

 
if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}

