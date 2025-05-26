import { toast } from 'wc-toast';

const escaneoBtn = document.querySelector(".escaneoCuenta");
let id = null;

escaneoBtn.addEventListener("click", async () => {
    const msg = document.querySelector(".msg");

    escaneoBtn.disabled = true;
    const loader = document.querySelector('.container-loader');
    loader.classList.remove('ocultar');
    const response = await fetch('http://localhost:8080/interact')
    const data = await response.json()

    if (!data) {
        alert("Error al escanear la tarjeta. Inténtalo de nuevo.");
        loader.classList.add('ocultar');
        return;
    }

    loader.classList.add('ocultar');
    id = data.id;
    msg.textContent = `ID de la tarjeta escaneada: ${id}`;
    msg.classList.remove('ocultar');
    escaneoBtn.disabled = false;
});

async function cargarTiposUsuario() {
    const select = document.getElementById('tipo_usuario');

    try {
        const res = await fetch('http://localhost:5000/tipos_usuario'); // cambia esto a tu endpoint real
        const data = await res.json();

        if (data.ok && Array.isArray(data.types)) {
            // Limpiar opciones previas
            select.innerHTML = '<option disabled selected>Selecciona una opción</option>';

            data.types.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.id;
                option.textContent = tipo.nombre;
                select.appendChild(option);
            });
        } else {
            select.innerHTML = '<option disabled>Error al cargar</option>';
        }
    } catch (error) {
        console.error('Error al cargar tipos de usuario:', error);
        select.innerHTML = '<option disabled>Error de conexión</option>';
    }
}
async function cargarCarreras() {
    const select = document.getElementById('carrera');

    try {
        const res = await fetch('http://localhost:5000/carreras'); // cambia esto a tu endpoint real
        const data = await res.json();

        if (data.ok && Array.isArray(data.carreras)) {
            // Limpiar opciones previas
            select.innerHTML = '<option disabled selected>Selecciona una opción</option>';

            data.carreras.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.id;
                option.textContent = tipo.nombre;
                select.appendChild(option);
            });
        } else {
            select.innerHTML = '<option disabled>Error al cargar</option>';
        }
    } catch (error) {
        console.error('Error al cargar tipos de carrera:', error);
        select.innerHTML = '<option disabled>Error de conexión</option>';
    }
}

// Llamamos la función al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    cargarTiposUsuario()
    cargarCarreras();
});
const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // obtener los datos del formulario
    const formData = Object.fromEntries(new FormData(event.target))

    formData.id_nfc = id; // asignar el ID escaneado al formulario

    console.log(formData);
    const resp = await fetch('http://localhost:5000/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
        })
    });

    const data = await resp.json();

    if (!data.ok) {
        toast.error('Error al registrar el usuario: ' + data.error);
    }

    toast.success('Usuario registrado correctamente');
});
