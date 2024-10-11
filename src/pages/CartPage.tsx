import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CartPageTitle = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.text};
`

const CartContainer = styled.div`
    padding: 20px;
    text-align: center;
`;

const CartItemList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 20px 0;
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

const CartItemDetailsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const CartItemImage = styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover;
    margin-right: 20px;
    border-radius: 5px;
`;

const CartItemDetails = styled.div`
    text-align: left;
`;

const CartItemTitle = styled.h2`
    font-size: 18px;
    margin: 0 0 5px;
    color: ${(props) => props.theme.colors.text};
`;

const CartItemPrice = styled.p`
    margin: 0;
    font-weight: bold;
    color: ${(props) => props.theme.colors.secondary};
`;

const CartItemQuantity = styled.p`
    margin: 5px 0;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.secondaryText};
`;

const QuantityButton = styled.button`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #b22222;
    }
`;

const RemoveButton = styled.button`
    padding: 5px 10px;
    color: white;
    background-color: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #b22222;
    }
`;

const TotalPrice = styled.h3`
    margin-top: 20px;
    font-size: 24px;
    color: ${(props) => props.theme.colors.text};
`;

const CheckoutButton = styled.button`
    margin-right: 10px;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.secondary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #109c8f;
    }
`;

const EmptyCartMessage = styled.p`
    font-size: 18px;
    color: ${(props) => props.theme.colors.secondaryText};
`;

const ClearCartButton = styled.button`
    margin-top 15px;
    margin-left: 10px;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #b22222;
    }
`;

const BackToShopButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #b22222;
    }
`;

// Cart Page Component
const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
    const navigate = useNavigate();
    
    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        clearCart();
        navigate('/checkout-success')
    }
    return (
        <CartContainer>
            <CartPageTitle>Your Cart</CartPageTitle>
            {cartItems.length > 0 ? (
                <>
                    <CartItemList>
                        {cartItems.map((item) => (
                            <CartItem key={item.id}>
                                <CartItemDetailsWrapper>
                                    <CartItemImage src={item.imageUrl} alt={item.title} />
                                    <CartItemDetails>
                                        <CartItemTitle>{item.title}</CartItemTitle>
                                        <CartItemPrice>${item.price}</CartItemPrice>
                                        <CartItemQuantity>
                                             <QuantityButton onClick={() => decreaseQuantity(item.id)}>-</QuantityButton>
                                             <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                             <QuantityButton onClick={() => increaseQuantity(item.id)}>+</QuantityButton>
                                        </CartItemQuantity>
                                    </CartItemDetails>
                                </CartItemDetailsWrapper>
                                <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
                            </CartItem>
                        ))}
                    </CartItemList>
                    <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
                    <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
                      <ClearCartButton onClick={clearCart}>Clear Cart</ClearCartButton>  
                </>
            ) : (
                <>
                    <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
                    <BackToShopButton onClick={() => navigate('/')}>Back to Shop</BackToShopButton>
                </>
            )}
        </CartContainer>
    );
};

export default CartPage;