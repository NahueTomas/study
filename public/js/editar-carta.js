const activar = e => {
    form.style.transition = `1s all`
    form.style.border = `5px solid #${e.target.value}`
    select.style.background = `#${e.target.value}`
}

const editar = async e => {
    try {
        e.preventDefault()
        const id = form.contenedor.value
        let datos = {
            titulo: form.titulo.value,
            link: form.link.value,
            contenido: form.contenido.value,
            color: select.value
        }

        let res = await fetch(`/carta/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        })
        res = await res.json()

        window.location.href = res.redirect
    } catch(err) {
        console.log(err)
    }
}

const form = document.querySelector('form')
const select = document.querySelector('#seleccionador-color')
select.style.background = `#${select.value}`
form.style.border = `5px solid #${select.value}`

select.addEventListener('change', activar)
form.addEventListener('submit', editar)