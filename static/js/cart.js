const products = document.querySelectorAll('.update-cart');

products.forEach(product => {
    product.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('update-cart')){
            const productId = target.dataset.product;
            const action = target.dataset.action;
            console.log(productId,action)
            if (user === 'AnonymousUser'){
                console.log('Not Logged in');
            } else {
               updateUserOrder(productId, action);
           }
        }
    })
})

function updateUserOrder(productId, action){
    console.log('User is Logged in, Sending data...');
     fetch('/update_item/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'productId': productId, 'action': action})
    })
    .then(res => res.json())
    .then(data => {
        console.log('data:', data)
        location.reload()
    })
    .catch(err => console.log(err))

}
