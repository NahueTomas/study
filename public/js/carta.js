import { traductor } from './funciones.js'

const toggleClass = e =>{
    e.target.classList.toggle('mostrar-tapado')
    e.target.style.transition = '.5s all'
}

const speakerStartStop = e => {
    const img_sonido_activar = '/assets/svg/btn-sonido-activar.svg'
    const img_sonido_desactivar = '/assets/svg/btn-sonido-desactivar.svg'

    let $btn_sonido = e.target
    if(e.target.nodeName === "IMG") $btn_sonido = e.target.parentElement

    $btn_sonido.classList.toggle('speak-activado')

    if($btn_sonido.classList.contains('speak-activado')){
        $btn_sonido.childNodes[0].src = img_sonido_desactivar
        let texto = ""
        
        const arrayContenido = document.querySelector(".contenedor-contenido-vista").childNodes
        
        arrayContenido.forEach( elemento => {
            texto += (elemento.textContent + "\n")
        })

        const speak = new SpeechSynthesisUtterance()

        speak.text = texto
        speak.rate = .8
        speak.volume = .8;
        speak.pitch = .8;
        speechSynthesis.speak(speak)

        speak.addEventListener('end', () => {
            $btn_sonido.childNodes[0].src = img_sonido_activar
            $btn_sonido.classList.remove('speak-activado')
        })
    } else{
        speechSynthesis.cancel()
    }
}

const crearBTN = contenedor => {
    const $btn_sonido = document.createElement('div')
    $btn_sonido.classList.add('btn-sonido')

    const $img_btn_sonido = document.createElement('img')
    $img_btn_sonido.src = '/assets/svg/btn-sonido-activar.svg'

    $btn_sonido.appendChild($img_btn_sonido)
    contenedor.appendChild($btn_sonido)
    $btn_sonido.addEventListener('click', speakerStartStop)
}

const checkearSpeech = contenedor => {
    if (!'speechSynthesis' in window) return

    // Antes de salir de la página apagamos la lectura
    window.onbeforeunload = () => {
        speechSynthesis.cancel()
    }
    crearBTN(contenedor)
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

    checkearSpeech(contenedor.parentElement)
}

document.addEventListener('DOMContentLoaded', cargado)