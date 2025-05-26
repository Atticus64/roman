

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

async function leerScaner() {
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
    console.log(dataConsulta);
    //const resp = await fetch(`http://localhost:5000/users/${data.id}`)
    const resp = await fetch(`http://localhost:5000/users/nfc/${data.id}`)
    const user = await resp.json()
    return user
}


const btnStartNFC = document.getElementById('btnStartNFC');

btnStartNFC.addEventListener('click', async () => {
    console.log('Iniciando NFC');
    btnStartNFC.disabled = true;

    const user = await leerScaner()
    console.log(user);
})