from django.shortcuts import render


def store(request):
    context = {
        'title': 'Store'
    }
    return render(request, 'store/store.html', context)


def cart(request):
    context = {
        'title': 'Cart'
    }
    return render(request, 'store/cart.html', context)


def checkout(request):
    context = {
        'title': 'Checkout'
    }
    return render(request, 'store/checkout.html', context)
