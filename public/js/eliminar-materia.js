const eliminar = async (id) => {
    try {
        await fetch(`/materia/${id}`, {
            method: 'DELETE',
            body: id
        })
        window.location.href = '/'
    } catch(err) {
        console.log(err)
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault()
        const id = form.querySelector('input[type="hidden"]').value
        
        eliminar(id)        
    })
})