import Modal from "./UI/Modal.jsx";
import {useContext} from "react";
import cartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../utils/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart(props) {
    const cartCtx = useContext(cartContext);
    const userProgressCtx= useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item)=> totalPrice + item.quantity * item.price, 0);
    console.log(cartTotal);
    function handleGoToCheckout(){
        userProgressCtx.showCheckout();
    }
    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item)=>(
                   <CartItem key={item.id}
                             name={item.name}
                             price={item.price}
                             quantity={item.quantity}
                             onIncrease={()=> cartCtx.addItem(item)}
                             onDecrease={()=> cartCtx.removeItem(item.id)}
                   />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <div className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 &&( <Button onClick={handleGoToCheckout}>Go to Checkout</Button> )}
            </div>
        </Modal>
    )
}
