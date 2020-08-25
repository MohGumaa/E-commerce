const products = document.querySelectorAll('.update-cart');

products.forEach(product => {
    product.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('update-cart')){
            const productId = target.dataset.product;
            const action = target.dataset.action;
            if (user === 'AnonymousUser'){
                addCookieItem(productId, action);
            } else {
               updateUserOrder(productId, action);
           }
        }
    })
})


// Add item to cookie
function addCookieItem(productId, action){
    console.log('Not Logged in', cart);

    if (action == 'add'){
        if(cart[productId] === undefined){
            cart[productId] = {'quantity': 1}
        } else {
            cart[productId]['quantity'] += 1;
        }
    }

    if (action == 'remove'){
        cart[productId]['quantity'] -= 1;

        if(cart[productId]['quantity'] <= 0){
            console.log('remove Item');
            delete cart[productId];
        }
    }

    console.log('Cart:', cart);
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/";

    location.reload()
}

function updateUserOrder(productId, action){
    console.log('User is Logged in, Sending data...', csrftoken);
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
