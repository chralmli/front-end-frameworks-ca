import React from 'react';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const CartContainer = styled.div`
    padding: 20px;
    text-align: center;
`;

const CartItemList = styled.ul`
    list-style: none;
    padding: 0;
`;

const CartItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

const CartItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;

const CartItemTitle = styled.h2`
    font-size: 18px;
    margin: 0 0 5px;
`;

const CartItemPrice = styled.p`
    margin: 0;
    font-weight: bold;
    color: ${(props) => props.theme.colors.primary};
`;

const CartItemQuantity = styled.p`
    margin: 5px 0;
    color: #666;
`;

const RemoveButton = styled.button`
    padding: 5px 10px;
    color: white;
    background-color: ${(props) => props.theme.colors.secondary};
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #d32f2f;
    }
`;

const TotalPrice = styled.h3`
    margin-top: 20px;
    font-size: 24px;
    color: ${(props) => props.theme.colors.primary};
`;

const CheckoutButton = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
    }
`;

const EmptyCartMessage = styled.p`
    font-size: 18px;
    color: #777;
`;

const ClearCartButton = styled.button`
    margin-top 15px;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.secondary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #d32f2f;
    }
`;

// Cart Page Component
const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    
    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContainer>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <CartItemList>
                        {cartItems.map((item) => (
                            <CartItem key={item.id}>
                                <CartItemDetails>
                                    <CartItemTitle>{item.title}</CartItemTitle>
                                    <CartItemPrice>${item.price}</CartItemPrice>
                                    <CartItemQuantity>Quantity: {item.quantity}</CartItemQuantity>
                                </CartItemDetails>
                                <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
                            </CartItem>
                        ))}
                    </CartItemList>
                    <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
                    <CheckoutButton>Proceed to Checkout</CheckoutButton>
                    <ClearCartButton onClick={clearCart}>Clear Cart</ClearCartButton>
                </>
            ) : (
                <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
            )}
        </CartContainer>
    );
};

export default CartPage;