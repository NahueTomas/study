import { traductor } from './funciones.js'

const atras = e => {
    let btn
    e.preventDefault()

    if(e.target.nodeName != "a"){btn = e.target.parentNode}
    else {btn = e.target}

    if (indice == 0) return

    indice -= 1
    pintarHTML(cartas)
}

const adelante = e => {
    let btn
    e.preventDefault()

    if(e.target.nodeName != "a"){btn = e.target.parentNode}
    else {btn = e.target}

    if( indice == (cartas.length -1)) return
    indice += 1
    pintarHTML(cartas)
}

const opciones = e => {
    const opciones = document.querySelector('.opciones')
    opciones.style.transition = '.2s all ease-in-out'
    opciones.classList.toggle('opciones-block')
}

const mostrar = e => {
    if (e.target.nodeName != "DIV"){
        const $contenedor = e.target.parentNode.parentNode.children[1]
        $contenedor.style.display = 'block'
        e.target.parentNode.remove()
        return
    }
    const $contenedor = e.target.parentNode.children[1]
    $contenedor.style.display = 'block'
    e.target.remove()
}

const toggle_display = () => {
    const $main_container = document.querySelector('.main-container')
    const $contenedores = document.querySelectorAll('.contenedor')
    const $contenedor_cartas = document.querySelector('.contenedor-cartas')

    $main_container.classList.toggle('ocultar')
    $contenedor_cartas.classList.toggle('ocultar')
    $contenedores.forEach( contenedor => {
        contenedor.classList.toggle('ocultar')
    })
    
    window.setTimeout( ()=> {
        $main_container.remove()
        $contenedores.forEach( contenedor => {
            contenedor.remove()
        })
        $contenedor_cartas.remove()
    }, 350)
}

const pintarHTML = cartas =>{
    const $body = document.querySelector('body')

    if(!!document.querySelector('.contenedor-centrador')){document.querySelector('.contenedor-centrador').remove()}

    const $container = document.createElement('div')
    $container.classList.add('contenedor-centrador')

    const $contador = document.createElement('h3')
    $contador.classList.add('contador')
    $contador.textContent = `${indice + 1} / ${cartas.length}`

    $container.appendChild($contador)

    const $carta = document.createElement('div')
    $carta.classList.add('contenedor-carta-vista')
    $carta.style.background = `#${cartas[indice].color}`
    
    const $h1 = document.createElement('h1')
    $h1.classList.add('titulo-carta-vista')
    $h1.textContent = cartas[indice].titulo
    
    const $contenedor = document.createElement('div')
    $contenedor.classList.add('contenedor-contenido-vista')
    
    const $p = document.createElement('p')
    $p.textContent = cartas[indice].contenido
    
    $carta.appendChild($h1)
    $contenedor.appendChild($p)
    $carta.appendChild($contenedor)

    const $btn_mostrar = document.createElement('div')
    const $msg1_mostrar = document.createElement('h6')
    $msg1_mostrar.textContent = "Intentá recordar el contenido sin ver."
    $btn_mostrar.appendChild($msg1_mostrar)
    const $msg2_mostrar = document.createElement('p')
    $msg2_mostrar.textContent = "( Tocá para ver el contenido de la carta :D )"
    $btn_mostrar.appendChild($msg2_mostrar)
    $btn_mostrar.classList.add('btn-mostrar')
    
    $carta.appendChild($btn_mostrar)
    
    const $contenedor_opciones = document.createElement('div')
    $contenedor_opciones.classList.add('contenedor-opciones-carta')
    $contenedor_opciones.style.width = '150px'
    $contenedor_opciones.style.margin = 'auto'

    const $link_salir = document.createElement('a') 
    $link_salir.href = window.location.pathname
    const $IMG_salir = document.createElement('img')
    $IMG_salir.src = "/assets/svg/btn-salir.svg"
    $link_salir.appendChild($IMG_salir)
    $link_salir.classList.add('btn-atras')

    const $link_atras = document.createElement('a') 
    $link_atras.href = '#'
    const $IMG_atras = document.createElement('img')
    $IMG_atras.src = "/assets/svg/btn-atras.svg"
    $link_atras.appendChild($IMG_atras)
    $link_atras.classList.add('btn-atras')

    const $link_adelante = document.createElement('a') 
    $link_adelante.href = '#'
    const $IMG_adelante = document.createElement('img')
    $IMG_adelante.src = "/assets/svg/btn-adelante.svg"
    $link_adelante.appendChild($IMG_adelante)
    $link_adelante.classList.add('btn-atras')

    $contenedor_opciones.appendChild($link_salir)
    $contenedor_opciones.appendChild($link_atras)
    $contenedor_opciones.appendChild($link_adelante)

    $link_adelante.addEventListener('click', adelante)
    $link_atras.addEventListener('click', atras)

    $carta.appendChild($contenedor_opciones)

    traductor($contenedor, $p)
    $contenedor.style.display = 'none'
    $btn_mostrar.addEventListener('click', mostrar)
    
    $container.appendChild($carta)
    $body.appendChild($container)
}

const pedir_cartas = async ruta_id => {
    const flecha = document.querySelector('#flecha')
    flecha.src = '/assets/svg/spinner.svg'
    let data = await fetch( `/prueba/${ruta_id}`)
    data = await data.json()
    const { cartas, id } = data
    flecha.src = '/assets/svg/btn-prueba.svg'
    
    toggle_display()
    return cartas
}

const modo_prueba = async e => {
    const ruta_id = window.location.pathname.split('/')[2]
    
    if( e.target.nodeName != 'DIV'){
        e.target.parentNode.removeEventListener('click', modo_prueba)
    }else {
        e.target.removeEventListener('click', modo_prueba)
    }
    cartas = await pedir_cartas(ruta_id)
    pintarHTML(cartas)
}

let indice = 0
let cartas
document.addEventListener('DOMContentLoaded', () => {
    const btn_opciones = document.querySelector('.btn-opciones')
    const btn_modo_prueba = document.querySelector('#btn-modo-prueba')

    btn_opciones.addEventListener('click', opciones)
    btn_modo_prueba.addEventListener('click', modo_prueba)
})