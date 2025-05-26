import { toast } from "wc-toast";
import { createCard } from "./card";
import atropos from "atropos";
import 'atropos/css'

let atroposInstance = null;
let color = 'blue';
async function getTypeRead(id) {
    const response = await fetch('http://localhost:5000/get_type_read', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })
    const data = await response.json()
    console.log(data);
}

/**
 * 
 * @returns { id: string, ok: boolean }
 */
async function leerScaner() {
    try {
        const response = await fetch('http://localhost:8080/interact_fake')
        const data = await response.json()

        const consulta = await fetch('http://localhost:5000/get_type_read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.id
            })
        })

        const dataConsulta = await consulta.json()
        if (!dataConsulta.ok) {
            toast.error('Error al consultar el tipo de lectura');
            return
        }

        const cardContainer = document.querySelector(".card-container");
        if (dataConsulta.type == 'user') {
            toast.success('Tipo de lectura: Usuario')
            const resp = await fetch(`http://localhost:5000/users/nfc/${data.id}`)
            const user = await resp.json()
            const cardColor = `bg-${color}-500/50`
            const border = `border-${color}-500/10`
            const shadowColor = `shadow-${color}-500/25`

            const card = createCard({
                border,
                shadowColor,
                cardColor,
                idCard: data.id
            })
            cardContainer.innerHTML = card; 
            atroposInstance = atropos({
                el: ".atropos",
                rotateTouch: true,
                rotateXMax: 20,
                rotateYMax: 20,
                rotateXFactor: 1,
                rotateYFactor: 1,
            });

        } else if (dataConsulta.type == 'book') {
            const resp = await fetch(`http://localhost:5000/books/nfc/${data.id}`)
            const { book: libro } = await resp.json()
            cardContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
                <h2>${libro.nombre}</h2>
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Año:</strong> ${libro.year}</p>
                <p><strong>ISBN:</strong> ${libro.isbn}</p>
                <img src="${libro.portada_url}" alt="${libro.nombre}" class="w-[15rem]" style="border-radius: 8px; margin-top: 10px;">
            </div>
          `;
            toast.success('Tipo de lectura: Libro');
        }
        return dataConsulta;
    }
    catch (error) {
        console.error('Error al leer el escáner:', error);
        toast.error('Error al leer el escáner');
        return null;
    }
}


const btnStartNFC = document.getElementById('btnStartNFC');

btnStartNFC.addEventListener('click', async () => {
    console.log('Iniciando NFC');
    btnStartNFC.disabled = true;

    const user = await leerScaner()
    console.log(user);
    btnStartNFC.disabled = false;
})