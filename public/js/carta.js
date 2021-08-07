import { traductor } from './funciones.js'

const cargado = () =>{
    const contenedor = document.querySelector('.contenedor-contenido-vista')
    const contenido = document.querySelector('p.contenido-carta-vista')

    traductor(contenedor, contenido)
}

document.addEventListener('DOMContentLoaded', cargado)