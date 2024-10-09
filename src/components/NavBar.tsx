import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartIcon from './CartIcon';

const Nav = styled.nav`
    background-color: ${(props) => props.theme.colors.secondary};
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
    color: #f5f5f5;
    text-decoration: none;
    padding: 5px 10px;
    font-family: 'Roboto', sans-serif;
    transition: color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-radius: 5px;
        color: ${(props) => props.theme.colors.text};
    }
`;

const NavBar: React.FC = () => {
    return (
        <Nav>
            <NavList>
                <NavItem>
                    <NavLink to="/">Home</NavLink>
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