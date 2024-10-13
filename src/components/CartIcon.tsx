import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styled from "styled-components";

const IconContainer = styled.div`
    position: relative;
    cursor: pointer;
`;

const CartIconSVG = styled.svg`
    width: 30px;
    height: 30px;
    color: #f5f5f5;
    transition: color 0.3s ease;

    &:hover {
    color: #333;
    }
`;

const ItemCount = styled.span`
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: ${(props) => props.theme.colors.secondary};
    color: white;
    border-radius: 50%;
    padding: 5px;
    font-size: 12px;
`;

const CartIcon: React.FC = () => {
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/cart");
    };

    return (
        <IconContainer onClick={handleClick}>
            <CartIconSVG xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </CartIconSVG>
            {cartCount > 0 && <ItemCount>{cartCount}</ItemCount>}
        </IconContainer>
    );
};


export default CartIcon;
