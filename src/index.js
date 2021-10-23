export function getCartId() {

}

export function getCartTotal() {

}

export function updateTopCartTotal($document, total) {
    $document.trigger('cart-total-update', total);
}
