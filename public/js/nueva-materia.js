const activar = (e) => {
    datos[e.target.name] = e.target.value

    if (e.target.value != ""){
        if(e.target.name == "materia"){
            const titulo = document.querySelector('#titulo')
            titulo.textContent = datos.materia
        } else if (e.target.name == "prof"){
            const prof = document.querySelector('#prof')
            prof.textContent = datos.prof
        } else if (e.target.name == "logo"){
            const logo = document.querySelector('.item')
            logo.textContent = datos.logo
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

const form = document.querySelector('form')
const select = document.querySelector('#seleccionador-color')
const tarjeta = document.querySelector('#tarjeta')

tarjeta.style.background = `#${select.value}`
tarjeta.style.boxShadow = `8px 8px #${select.value}50`
select.style.background = `#${select.value}`

const materia = form.materia
const prof = form.prof

const datos = {
    materia: "",
    prof: "",
    logo: ""
}

materia.addEventListener('input', activar)
prof.addEventListener('input', activar)
logo.addEventListener('input', activar)
select.addEventListener('change', cambioColor)