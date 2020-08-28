document.getElementById('addBurger').addEventListener('click', event => {
    event.preventDefault()

    axios.post('/api/burgers', {
        name: document.getElementById('product').value,

        devoured: false
    })
        .then(({ data }) => {
            let burgerElem = document.createElement('li')
            burgerElem.className = 'list-group-item'
            burgerElem.id = data.id
            burgerElem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${document.getElementById('product').value}</h5>
        </div>
      
      <small>Devoured? 0</small>
        `
            document.getElementById('notDevoured').append(burgerElem)

            document.getElementById('product').value = ''
            
        })
        .catch(err => console.error(err))
})

document.addEventListener('click', event => {
    if (event.target.classList.contains('purchase')) {
        axios.put(`/api/groceries/${event.target.parentNode.parentNode.id}`, {
            purchased: true
        })
            .then(() => {
                let groceryElem = document.createElement('li')
                groceryElem.className = 'list-group-item'
                groceryElem.id = event.target.parentNode.parentNode.id
                groceryElem.innerHTML = `
         <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">${event.target.dataset.name}</h5>
           <button class="btn btn-danger remove">X</button>
         </div>
         <p class="mb-1">Quantity: ${event.target.dataset.quantity}</p>
         <small>Price: $${event.target.dataset.cost}</small>
        `
                document.getElementById('purchased').append(groceryElem)
                event.target.parentNode.parentNode.remove()
            })
            .catch(err => console.error(err))
    } else if (event.target.classList.contains('remove')) {
        axios.delete(`/api/groceries/${event.target.parentNode.parentNode.id}`)
            .then(() => {
                event.target.parentNode.parentNode.remove()
            })
            .catch(err => console.error(err))
    }
})