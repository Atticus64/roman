import './style.css'

import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Asegúrate que es el mismo puerto del backend
const box = document.querySelector(".data");

socket.on("connect", () => {
  console.log("Conectado al servidor WebSocket");
  socket.send("Hola desde el frontend");
});

socket.on("message", (msg) => {
    console.log(msg)
  console.log("id del mensaje: ", msg.id);
  box.textContent = msg.id;
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});