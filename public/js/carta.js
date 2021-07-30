const cargado = () =>{
    const contenedor = document.querySelector('.contenedor-contenido-vista')
    const contenido = document.querySelector('p.contenido-carta-vista')
    const arrayContenido = contenido.textContent.split("\n")
    
    contenido.remove()

    arrayContenido.forEach( parrafo => {
        const $parrafo = document.createElement('p')
        $parrafo.classList.add('contenido-carta-vista')
        $parrafo.textContent = parrafo

        contenedor.appendChild($parrafo)
    })
}

document.addEventListener('DOMContentLoaded', cargado)