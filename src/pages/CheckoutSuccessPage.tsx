import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled.h1`
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 20px;
`;

const Message = styled.p`
    font-size: 18px;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 40px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    }
`;

const CheckoutSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart when page is rendered
        clearCart();
    }, [clearCart]);

    const handleBackToStore = () => {
        navigate('/');
    };

    return (
        <Container>
            <Title>Thank you for your purchase!</Title>
            <Message>Your order was successful.</Message>
            <Button onClick={handleBackToStore}>Back to Store</Button>
        </Container>
    );
};

export default CheckoutSuccessPage;