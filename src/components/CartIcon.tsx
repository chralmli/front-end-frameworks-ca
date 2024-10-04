import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styled from "styled-components";

const IconContainer = styled.div`
    position: relative;
    cursor: pointer;
`;

const CartIconImage = styled.img`
    width: 30px;
    height: 30px;
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
            <CartIconImage src="/cart-icon.svg" alt="Cart" />
            {cartCount > 0 && <ItemCount>{cartCount}</ItemCount>}
        </IconContainer>
    );
};


export default CartIcon;
