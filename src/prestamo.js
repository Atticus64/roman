import { toast } from 'wc-toast';


const bookBtn = document.getElementById('btnRegisterBook');
const userBtn = document.getElementById('btnRegisterUser');

let id_nfc_ejemplar = null;
let id_nfc_usuario = null;

async function realizarPrestamo(id_nfc_usuario, id_nfc_ejemplar) {
    const response = await fetch('http://localhost:5000/prestamo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_nfc_usuario,
            id_nfc_ejemplar
        })
    });

    const data = await response.json();
    if (!data.ok) {
        toast.error('Error al realizar el préstamo');
        return;
    }

    toast.success('Préstamo realizado con éxito');
}

async function leerDato() {

    //const resp = await fetch('http://localhost:8080/interact');
    const resp = await fetch('http://localhost:8080/interact');
    const data = await resp.json();

    const consulta = await fetch('http://localhost:5000/get_type_read', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: data.id
        })
    });

    console.log(data);

    const dataConsulta = await consulta.json();

    if (!dataConsulta.ok) {
        toast.error('No se pudo leer la data');
        return;
    }

    console.log(dataConsulta)
    if (dataConsulta.type === 'user') {
        id_nfc_usuario = data.id;
    } else if (dataConsulta.type === 'book') {
        id_nfc_ejemplar = data.id;
    } else {
        toast.error('Tipo de lectura no reconocido');
        return;
    }

    if (id_nfc_usuario && id_nfc_ejemplar) {
        await realizarPrestamo(id_nfc_usuario, id_nfc_ejemplar);
        id_nfc_ejemplar = null; // Reiniciar el ID del libro
        id_nfc_usuario = null; // Reiniciar el ID del usuario
    } else {
        toast.success(`ID leída: ${data.id}. Esperando el otro ID...`);
    }
    
}


bookBtn.addEventListener('click', async () => {
    try {
        await leerDato();
    } catch (error) {
        console.error('Error al leer el libro:', error);
        toast.error('Error al leer el libro');
    }
})


userBtn.addEventListener('click', async () => {
    try {
        await leerDato();

    } catch (error) {
        console.error('Error al leer el usuario:', error);
        toast.error('Error al leer el usuario');
    }
})

