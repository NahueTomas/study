export const traductor = (contenedor, contenido) => {
    const arrayContenido = contenido.textContent.split("\n")
    contenido.remove()

    arrayContenido.forEach( parrafo => {
        
        let $linea

        if( parrafo.trim() == ""){
            $linea = document.createElement('br')
        } else if ( parrafo.trim() == "="){
            $linea = document.createElement('hr')
        } else if (parrafo.trim().split('')[0] == "-"){
            $linea = document.createElement('li')
            $linea.classList.add('lista-chica')
            $linea.textContent = parrafo.slice(1)
        } else if (parrafo.trim().split('')[0] == "+"){
            $linea = document.createElement('li')
            $linea.classList.add('lista-grande')
            $linea.textContent = parrafo.slice(1)
        } else if(parrafo.trim().split('')[0] == "#"){
            $linea = document.createElement('h3')
            $linea.textContent = parrafo.slice(1)
        } else if(parrafo.trim().split('')[0] == "{"){
            $linea = document.createElement('div')
            $linea.classList.add('formula')
            $linea.textContent = parrafo.slice(1)
        } else{
            $linea = document.createElement('p')
            $linea.classList.add('contenido-carta-vista')
            $linea.textContent = parrafo
        }
        
        if(parrafo.trim().includes("&")){            
            $linea = document.createElement('p')
            const arrayTexto = parrafo.split('&')
            const contador = arrayTexto.length - 1
            $linea.innerHTML = ""

            for (let i = 0; i < contador; i++ ){
                if( i % 2 != 0 ){
                    $linea.innerHTML += `<span class="tapado">${arrayTexto[i]}</span>`
                }else{
                    $linea.innerHTML += `${arrayTexto[i]}`
                }
            }
        }
        
        contenedor.appendChild($linea)
    })
}