import { toast } from "wc-toast";
import { createCard } from "./card";
import atropos from "atropos";
import 'atropos/css'

let atroposInstance = null;
let userData = null;
let id = null;

const colors = {
    blue: 'blue',
    red: 'red',
    green: 'green',
    yellow: 'yellow',
    purple: 'purple',
    pink: 'pink',
    orange: 'orange',
    indigo: 'indigo',
    teal: 'teal',
}
const container = document.getElementById('color-picker');


function createMenuColor() {

    const collection = {
        blue: 'from-blue-400 to-blue-600',
        red: 'from-red-400 to-red-600',
        green: 'from-green-400 to-green-600',
        yellow: 'from-yellow-300 to-yellow-500',
        purple: 'from-purple-400 to-purple-600',
        pink: 'from-pink-400 to-pink-600',
        orange: 'from-orange-400 to-orange-600',
        indigo: 'from-indigo-400 to-indigo-600',
        teal: 'from-teal-400 to-teal-600',
      };
    
      let selectedColor = null;
    
      for (const [color, gradient] of Object.entries(collection)) {
        const btn = document.createElement('button');
        btn.className = `
          w-8 h-8 rounded-full 
          bg-gradient-to-br ${gradient} 
          border-2 border-transparent 
          transition-all duration-200
          outline-none focus:outline-none
        `;
        btn.title = color;
    
        
        btn.addEventListener('click', () => {
          if (selectedColor) {
            selectedColor.classList.remove('ring-2', 'ring-offset-2', 'ring-black');
          }
          btn.classList.add('ring-2', 'ring-offset-2', 'ring-black');
          selectedColor = btn;
        
          // Puedes hacer algo con el color seleccionado aquí
          console.log(`Color seleccionado: ${color}`);
          console.log(userData, selectedColor.title, id);
          const colorSet = selectedColor.title;
          instanceCard(
            userData,
            colorSet,
            id
          )
    
        });
        container.appendChild(btn);
    }    
}


  /**
   * 
   * @param {import("./card").User} user 
   * @param {string} colorSet
   * @param {string} id
   */
function instanceCard(user, colorSet, id) {
    const cardContainer = document.querySelector(".card-container");
    const cardColor = `bg-${colorSet}-500/50`
    const border = `border-${colorSet}-500/10`
    const shadowColor = `shadow-${colorSet}-500/25`

    cardContainer.innerHTML = createCard({
        border,
        shadowColor,
        cardColor,
        idCard: id,
        user
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
}

let color = colors.teal;
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
}

/**
 * 
 * @returns { id: string, ok: boolean }
 */
async function leerScaner() {
    try {
        const loader = document.querySelector('.container-loader');
        loader.classList.remove('ocultar');
        const response = await fetch('http://localhost:8080/interact')
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
            loader.classList.add('ocultar');
            return
        }

        loader.classList.add('ocultar');
        id = data.id;
        const cardContainer = document.querySelector(".card-container");
        if (dataConsulta.type == 'user') {
            createMenuColor();
            toast.success('Tipo de lectura: Usuario')
            const resp = await fetch(`http://localhost:5000/users/nfc/${data.id}`)
            const { user, ok } = await resp.json()
            const cardColor = `bg-${color}-500/50`
            const border = `border-${color}-500/10`
            const shadowColor = `shadow-${color}-500/25`

            user.color = color;
            userData = user;
            const card = createCard({
                border,
                shadowColor,
                cardColor,
                idCard: data.id,
                user
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
    container.innerHTML = '';
    btnStartNFC.disabled = true;

    const user = await leerScaner()
    btnStartNFC.disabled = false;
})