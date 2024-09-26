import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <h2>{item.title}</h2>
                                <p>Price: {item.price} x {item.quantity}</p>
                                <button onClick={() => removeFromCart(item.id)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: {totalPrice}</h3>
                    <button onClick={clearCart}>Clear setCartItems</button>
                </div>
            )}
        </div>
    );
};

export default CartPage;