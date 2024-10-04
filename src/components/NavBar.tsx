import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartIcon from './CartIcon';

const Nav = styled.nav`
    background-color: ${(props) => props.theme.colors.primary};
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 20px;
`;

const NavItem = styled.li`
    font-size: 18px;
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
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