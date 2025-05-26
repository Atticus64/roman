import atropos from 'atropos';
import './style.css'

import 'atropos/css'

import { io } from "socket.io-client";
import { createCard } from './card';

const socket = io("http://localhost:5000"); // Asegúrate que es el mismo puerto del backend

const message = document.querySelector(".msgBox");
let cardPresent = false

let atroposInstance = null;
const btn = document.querySelector(".colorBtn");
const test = document.querySelector(".testBtn");

let color = "blue";
let id = 0;
socket.on("connect", () => {
    console.log("Conectado al servidor WebSocket");
    socket.send("Hola desde el frontend");
});

test.addEventListener("click", async () => {

    message.textContent = "Esperando escaneo de la tarjeta....."
    const resp = await fetch("http://localhost:5000/interact")
    const data = await resp.json();

    cardPresent = data.cardPresent
    btn.classList.remove("hidden")
    const cardColor = `bg-${color}-500/50`
    const border = `border-${color}-500/10`
    const shadowColor = `shadow-${color}-500/25`
    const cardContainer = document.querySelector(".card-container");
    id = data.id;

    cardContainer.innerHTML = createCard({
        cardColor,
        border,
        shadowColor,
        idCard: id,
    });

    atroposInstance = atropos({
        el: ".atropos",
        rotateTouch: true,
        rotateXMax: 20,
        rotateYMax: 20,
        rotateXFactor: 1,
        rotateYFactor: 1,
    });

    message.textContent = ""

});

btn.addEventListener("click", () => {

    const colors = ["pink", "blue", "green", "red", "yellow"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    color = colors[randomIndex];
    const card = document.querySelector(".cardUser");
    console.log(color);
    const cardColor = `bg-${color}-500/50`
    const border = `border-${color}-500/10`
    const shadowColor = `shadow-${color}-500/25`

    card.innerHTML = createCard({
        cardColor,
        border,
        shadowColor,
        idCard: id,
    });

    if (atroposInstance) {
        atroposInstance.destroy();
    }

    atroposInstance = atropos({
        el: ".atropos",
        rotateTouch: true,
        rotateXMax: 20,
        rotateYMax: 20,
        rotateXFactor: 1,
        rotateYFactor: 1,
    });
})

socket.on("message", (msg) => {
    console.log(msg)

    if (!msg.id) return;
    const test = `
    <div class="bg-pink-400 border-blue-200/10 shadow-pink-400">`
    const cardColor = `bg-${color}-500/50`
    const border = `border-${color}-500/10`
    const shadowColor = `shadow-${color}-500/25`
    const cardContainer = document.querySelector(".card-container");
    id = msg.id;

    cardContainer.innerHTML = createCard({
        cardColor,
        border,
        shadowColor,
        idCard: msg.id,
    });

    atroposInstance = atropos({
        el: ".atropos",
        rotateTouch: true,
        rotateXMax: 20,
        rotateYMax: 20,
        rotateXFactor: 1,
        rotateYFactor: 1,
    });

});

socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
});