

async function leerScaner() {
    const response = await fetch('http://localhost:8080/interact_fake')
    const data = await response.json()


    const resp = await fetch(`http://localhost:5000/users/${data.id}`)
    //const resp = await fetch(`http://localhost:5000/users/nfc/${data.id}`)
    const user = await resp.json()
    console.log(user)
}

leerScaner()

