import {useContext, useActionState} from "react";
import Modal from "./UI/Modal.jsx";
import {currencyFormatter} from "../utils/formatting.js";
import CartContext from "../store/CartContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.jsx";
import Error from "./Error.jsx";
const requestConfig = {
    method: "POST",
    headers:{
        'Content-Type' : 'application/json'
    },

};
export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const {data,
        // isLoading:isSending,
        error, sendRequest,
        clearData} = useHttp('http://localhost:3000/orders', requestConfig,[]);
    const cartTotal = cartCtx.items.reduce((totalPrice,item)=> totalPrice + item.quantity * item.price, 0);

    function handleCloseCheckout(){
        userProgressCtx.hideCheckout();
    }
    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    // function handleSubmit(event){
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const customerData = Object.fromEntries(formData.entries());
    //     sendRequest(JSON.stringify({
    //         order:{
    //             items: cartCtx.items,
    //             customer: customerData,
    //         }}));
    // }
   async function checkoutAction(prevState, formData){
            const customerData = Object.fromEntries(formData.entries());
           await sendRequest(JSON.stringify({
                order:{
                    items: cartCtx.items,
                    customer: customerData,
                }}));
    }
    const [formState, formAction, isSending]= useActionState(checkoutAction, null);
    let actions= (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );
    if(isSending){
        actions = <span>Sending order...</span>
    }
    if (data && !error){
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            <h2>Success!</h2>
            <p>Your order has been submitted successfully!</p>
            <p>We will process your order in the mentioned time frame further details shared via Email.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            {/*<form onSubmit={handleSubmit}>*/}
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input type="text" label="Full Name" id="name"/>
                <Input type="email" label="Email Address" id="email"/>
                <Input type="text" label="Street" id="street"/>
                <div className="control-row">
                    <Input type="text" label="City" id="city"/>
                    <Input type="text" label="Postal Code" id="postal-code"/>
                </div>
                {error && <Error title="Failed To submit order" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
);
}
