export const traductor = (contenedor, contenido) => {
    const arrayContenido = contenido.textContent.split("\n")
    contenido.remove()

    arrayContenido.forEach( parrafo => {
        if( parrafo.trim() == ""){
            const $br = document.createElement('br')
            contenedor.appendChild($br)
        } else if ( parrafo.trim() == "="){
            const $hr = document.createElement('hr')
            contenedor.appendChild($hr)
        } else if (parrafo.trim().split('')[0] == "-"){
            const $li = document.createElement('li')
            $li.textContent = parrafo.slice(2)
            contenedor.appendChild($li)
        } else if(parrafo.trim().split('')[0] == "#"){
            const $h3 = document.createElement('h3')
            $h3.textContent = parrafo.slice(1)
            contenedor.appendChild($h3)
        }
        else{
            const $parrafo = document.createElement('p')
            $parrafo.classList.add('contenido-carta-vista')
            $parrafo.textContent = parrafo
            contenedor.appendChild($parrafo)
        }
    })
}