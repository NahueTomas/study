const activar = e => {
    const form = document.querySelector('form')
    form.style.transition = `1s all`
    form.style.border = `5px solid #${e.target.value}`
    select.style.background = `#${e.target.value}`
}

const select = document.querySelector('#seleccionador-color')
select.addEventListener('change', activar)