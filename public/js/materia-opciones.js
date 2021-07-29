document.addEventListener('DOMContentLoaded', () => {
    const btn_opciones = document.querySelector('.btn-opciones')
    btn_opciones.addEventListener('click', e => {
        const opciones = document.querySelector('.opciones')
        opciones.style.transition = '.1s all'
        opciones.classList.toggle('opciones-block')
    })
})