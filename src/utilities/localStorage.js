const getStoredCard = () =>{
    const storedCartString = localStorage.getItem('cart');
    if(storedCartString){
        return JSON.parse(storedCartString)
    }
    return [];
}
const saveLocalStorage = cart =>{
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified)
}

const addLocalStore = id =>{
    const cart = getStoredCard();
    cart.push(id);
    // save to local stroage
    saveLocalStorage(cart)
}


const removeFromLocalStorage = id =>{
    const cart = getStoredCard();
    // removing every id
    const remaining = cart.filter(idx => idx !== id);
    saveLocalStorage(remaining)
}
export{addLocalStore, getStoredCard, removeFromLocalStorage}