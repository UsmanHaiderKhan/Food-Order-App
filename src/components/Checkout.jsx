import Modal from "./UI/Modal.jsx";
import {currencyFormatter} from "../utils/formatting.js";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice,item)=> totalPrice + item.quantity * item.price, 0);

    function handleCloseCheckout(){
        userProgressCtx.hideCheckout();
    }
    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                order:{
                    items: cartCtx.items,
                    customer: customerData,
                }
            }),
        });
    }
    return(
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
              <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input type="text" label="Full Name" id="name"/>
                <Input type="email" label="Email Address" id="email" />
                <Input type="text" label="Street" id="street" />
                <div className="control-row">
                    <Input type="text" label="City" id="city" />
                    <Input type="text" label="Postal Code" id="postal-code" />
                </div>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}
