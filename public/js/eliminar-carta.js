const eliminar = async (id) => {
    try {
        let redirect = await fetch(`/carta/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        redirect = await redirect.json()

        window.location.href = redirect.redirect
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