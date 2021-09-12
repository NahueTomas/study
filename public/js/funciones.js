export const traductor = (contenedor, contenido) => {
    const arrayContenido = contenido.textContent.split("\n")
    contenido.remove()

    arrayContenido.forEach( parrafo => {
        
        let $linea = ""

        // ESPACIO
        if( parrafo.trim() == ""){
            $linea = document.createElement('br')
        }
        // LÍNEA
        else if ( parrafo.trim() == "="){
            $linea = document.createElement('hr')
        }
        // LISTA CHICA
        else if (parrafo.trim().split('')[0] == "-"){
            $linea = document.createElement('li')
            $linea.classList.add('lista-chica')

            if (parrafo.trim().includes("&")){
                const arrayTexto = parrafo.slice(1).split('&')
                const contador = arrayTexto.length - 1
    
                for (let i = 0; i <= contador; i++ ){
                    if( i % 2 != 0 ){
                        $linea.innerHTML += `<span class="tapado">${arrayTexto[i]}</span>`
                    }else{
                        $linea.innerHTML += `${arrayTexto[i]}`
                    }
                }
            } else{$linea.textContent = parrafo.slice(1)}
        } 
        // LISTA GRANDE
        else if (parrafo.trim().split('')[0] == "+"){
            $linea = document.createElement('li')
            $linea.classList.add('lista-grande')

            if (parrafo.trim().includes("&")){
                const arrayTexto = parrafo.slice(1).split('&')
                const contador = arrayTexto.length - 1
    
                for (let i = 0; i <= contador; i++ ){
                    if( i % 2 != 0 ){
                        $linea.innerHTML += `<span class="tapado">${arrayTexto[i]}</span>`
                    }else{
                        $linea.innerHTML += `${arrayTexto[i]}`
                    }
                }
            } else{$linea.textContent = parrafo.slice(1)}
        }
        // SUBTITULO
        else if(parrafo.trim().split('')[0] == "#"){
            $linea = document.createElement('h3')
            $linea.classList.add('subtitulo')
            $linea.textContent = parrafo.slice(1)
        }
        // TITULO
        else if(parrafo.trim().split('')[0] == "|"){
            $linea = document.createElement('h3')
            $linea.classList.add('titulo')
            $linea.textContent = parrafo.slice(1)
        }
        // DESCRIPCION
        else if(parrafo.trim().split('')[0] == "%"){
            $linea = document.createElement('p')
            $linea.classList.add('descripcion')
            $linea.textContent = parrafo.slice(1)
        }
        // FORMULA
        else if(parrafo.trim().split('')[0] == "["){
            $linea = document.createElement('div')
            $linea.classList.add('formula')
            $linea.textContent = parrafo.slice(1)
        }
        // CODIGO
        else if(parrafo.trim().split('')[0] == "{"){
            $linea = document.createElement('div')
            $linea.classList.add('codigo')
            $linea.textContent = parrafo.slice(1)
        } 
        // PÁRRAFO
        else{
            $linea = document.createElement('p')
            $linea.classList.add('contenido-carta-vista')
            
            if(parrafo.trim().includes("&")){            
                const arrayTexto = parrafo.split('&')
                const contador = arrayTexto.length - 1

                for (let i = 0; i <= contador; i++ ){
                    if( i % 2 != 0 ){
                        $linea.innerHTML += `<span class="tapado">${arrayTexto[i]}</span>`
                    }else{
                        $linea.innerHTML += `${arrayTexto[i]}`
                    }
                }
            } else{$linea.textContent = parrafo}
        }
        contenedor.appendChild($linea)
    })
}