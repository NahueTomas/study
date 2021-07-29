const editar = async (id, obj) => {
    console.log(obj)
    try {
        await fetch(`/materia/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        })
        window.location.href = '/'
    } catch(err) {
        console.log(err)
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.querySelector('form')
    const select = form.querySelector('select')
    select.style.background = `#${select.value}`
    select.addEventListener('change', ()=> {select.style.background = `#${select.value}`})

    form.addEventListener('submit', e => {
        e.preventDefault()
        const id = form.querySelector('input[type="hidden"]').value
        
        const obj = {
            materia: form.materia.value,
            logo: form.logo.value,
            color: form.color.value,
            prof:form.prof.value
        }

        editar(id, obj)
    })
})