import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import Cart from "../Card/Cart";
import { addLocalStore, getStoredCard } from "../../utilities/localStorage";
const Bottles = () => {

    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() =>{
         fetch('bottol.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    }, [])

// load cart from local store
useEffect(() =>{
    console.log('called the useEffect', bottles.length);
    
    if(bottles.length > 0){
        const storedCart = getStoredCard();
    console.log(storedCart, bottles);

    const saveCart = [];
    for (const id of storedCart) {
        console.log(id);
        const bottle = bottles.find(bottle => bottle.id === id);
        if (bottle) {
            saveCart.push(bottle)
        }
        
    }
    console.log('Save cart',saveCart);
    setCart(saveCart)
    
    }
}, [bottles])


const handleAddToCart = bottle =>{
    // console.log(bottle);
    const newCart = [...cart, bottle];
    setCart(newCart)
    addLocalStore(bottle.id)
}

const handleRemoveFromCart = id =>{
// visual cart remove
const remainingCart = cart.filter(bottle => bottle.id !== id)
setCart(remainingCart)
// remove from localstorage
removeFromLocalStorage(id)
}

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            {/* <h4>Cart: {cart.length}</h4> */}

               <Cart cart={cart} handleRemoveFromCart ={handleRemoveFromCart}></Cart>



            <div className="bottle-container">
            {
                bottles.map(bottle => <Bottle key={bottle.id} 
                    bottle={bottle} 
                    handleAddToCart={handleAddToCart}></Bottle>)
            }
            </div>
           
        </div>
    );
};

export default Bottles;