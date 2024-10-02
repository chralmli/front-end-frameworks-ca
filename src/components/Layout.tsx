import React from 'react';
import NavBar from './NavBar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 20px;
`;

const Footer = styled.footer`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    text-align: center;
    padding: 10px 0;
`;

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <LayoutContainer>
            <NavBar />
            <MainContent>
                {children}
            </MainContent>
            <Footer>
                &copy; 2024 Ecom Store
            </Footer>
        </LayoutContainer>
    );
};

export default Layout;