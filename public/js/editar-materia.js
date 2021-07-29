const editar = async (id, obj) => {
    try {
        await fetch(`/materia/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        })
        window.location.href = '/'
    } catch(err) {
        console.log(err)
    }
}

const activar = (e) => {
    obj[e.target.name] = e.target.value

    if (e.target.value != ""){
        if(e.target.name == "materia"){
            const titulo = document.querySelector('#titulo')
            titulo.textContent = obj.materia
        } else if (e.target.name == "prof"){
            const prof = document.querySelector('#prof')
            prof.textContent = obj.prof
        } else if (e.target.name == "logo"){
            const logo = document.querySelector('.item')
            logo.textContent = obj.logo
        }
    }
    return
}

const cambioColor = e =>{
    tarjeta.style.transition = `1s all`
    tarjeta.style.background = `#${e.target.value}`
    tarjeta.style.boxShadow = `8px 8px #${e.target.value}50`

    select.style.background = `#${e.target.value}`
}

let obj = {}
let select, tarjeta

document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.querySelector('form')
    select = form.querySelector('select')
    tarjeta = document.querySelector('#tarjeta')

    tarjeta.style.background = `#${select.value}`
    tarjeta.style.boxShadow = `8px 8px #${select.value}50`
    select.style.background = `#${select.value}`

    select.addEventListener('change', cambioColor)
    const materia = form.materia
    const logo = form.logo
    const prof = form.prof

    materia.addEventListener('input', activar)
    prof.addEventListener('input', activar)
    logo.addEventListener('input', activar)
    select.addEventListener('change', cambioColor)


    form.addEventListener('submit', e => {
        e.preventDefault()
        const id = form.querySelector('input[type="hidden"]').value
        
        obj = {
            materia: form.materia.value,
            logo: form.logo.value,
            color: form.color.value,
            prof:form.prof.value
        }

        if( !obj.materia || !obj.logo || !obj.color ){
            return
        }

        editar(id, obj)
    })
})