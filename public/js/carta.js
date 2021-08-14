import { traductor } from './funciones.js'

const toggleClass = e =>{
    e.target.classList.toggle('mostrar-tapado')
    e.target.style.transition = '.5s all'
}

const cargado = () =>{
    const contenedor = document.querySelector('.contenedor-contenido-vista')
    const contenido = document.querySelector('p.contenido-carta-vista')

    traductor(contenedor, contenido)
    const arrayTapado = document.querySelectorAll('.tapado')

    if (!!arrayTapado){
        arrayTapado.forEach( tapado => {
            tapado.addEventListener('click', toggleClass)
        })
    }
}

document.addEventListener('DOMContentLoaded', cargado)