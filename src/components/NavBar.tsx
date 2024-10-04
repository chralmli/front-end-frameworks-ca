import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartIcon from './CartIcon';

const Nav = styled.nav`
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.0.5);
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 30px;
    margin: 0;
`;

const NavItem = styled.li`
    font-size: 18px;
    font-weight: 500;
`;

const NavLink = styled(Link)`
    color: #1c1c1c;
    text-decoration: none;
    padding: 5px 10px;
    font-family: 'Roboto', sans-serif;
    transition: color 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #f0f0f0;
        border-radius: 5px;
        color: #e63946;
    }
`;

    const CartIconContainer = styled.div`
    position: relative;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const CartIconImage = styled.img`
    width: 30px;
    height: 30px;
`;

const CartItemCount = styled.span`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #e63946;
    color: white;
    border-radius: 50%;
    padding: 5px;
    font-size: 12px;
    font-weight: bold;
    min-width: 24px;
    text-align: center;
    line-height: 1.2;
`;

const NavBar: React.FC = () => {
    return (
        <Nav>
            <NavList>
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/cart">Cart</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/contact">Contact</NavLink>
                </NavItem>
            </NavList>
            <CartIcon />
        </Nav>
    );
};

export default NavBar;