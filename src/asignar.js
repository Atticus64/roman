'use strict';
import Atropos from 'atropos';

// Usuarios de ejemplo
const usuarios = [
    {
        id: "user123",
        name: "Luisito Martínez",
        photo: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: "user456",
        name: "Ana Gómez",
        photo: "https://randomuser.me/api/portraits/women/44.jpg"
    }
];

const form = document.getElementById("asignarForm");
const status = document.getElementById("status");
const tarjetaContainer = document.getElementById("tarjetaContainer");
const nombre = document.getElementById("nombre");
const uid = document.getElementById("uid");
const cardId = document.getElementById("cardId");
const foto = document.getElementById("foto");
const resetBtn = document.getElementById("resetBtn");

let usuarioActual = null;
let esperandoTarjeta = false;

// Inicializa socket.io con namespace /data
const socket = io('/data');

form.addEventListener("submit", e => {
    e.preventDefault();
    const idIngresado = document.getElementById("userId").value.trim();
    usuarioActual = usuarios.find(u => u.id === idIngresado);

    if (!usuarioActual) {
        status.textContent = "❌ Usuario no encontrado.";
        tarjetaContainer.classList.add("hidden");
        resetBtn.style.display = "none";
        return;
    }

    esperandoTarjeta = true;
    status.textContent = "⌛ Esperando tarjeta NFC...";
    tarjetaContainer.classList.add("hidden");
    resetBtn.style.display = "none";

    // Enviar evento para backend o emulador de NFC
    socket.emit('esperar_nfc');
});

socket.on('nfc_detectada', (tarjeta) => {
    if (!esperandoTarjeta) return;

    esperandoTarjeta = false;
    status.textContent = "✨ Tarjeta asignada correctamente. ¡Éxito! ✨";

    nombre.textContent = usuarioActual.name;
    uid.textContent = usuarioActual.id;
    cardId.textContent = tarjeta.id || "N/A";
    foto.src = usuarioActual.photo || "https://via.placeholder.com/80";

    tarjetaContainer.classList.remove("hidden");
    resetBtn.style.display = "inline-block";
});

resetBtn.addEventListener("click", e => {
    e.preventDefault();
    esperandoTarjeta = false;
    status.textContent = "";
    tarjetaContainer.classList.add("hidden");
    resetBtn.style.display = "none";
    form.reset();
    usuarioActual = null;
});

// Inicializa Atropos 3D
Atropos({
    el: ".atropos",
    shadow: false,
    highlight: true,
    rotateXMax: 15,
    rotateYMax: 15,
});

// Animación estrellas fondo
const canvas = document.getElementById("stars-bg");
const ctx = canvas.getContext("2d");
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = [];
const numStars = 200;
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
    });
}

let mouseX = 0;
let mouseY = 0;
window.addEventListener("mousemove", e => {
    mouseX = e.clientX / width - 0.5;
    mouseY = e.clientY / height - 0.5;
});

function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";

    for (const star of stars) {
        star.x += mouseX * star.speed;
        star.y += mouseY * star.speed;

        if (star.x < 0) star.x = width;
        else if (star.x > width) star.x = 0;

        if (star.y < 0) star.y = height;
        else if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();

