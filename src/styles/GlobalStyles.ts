import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    /* CSS Reset */
    * {
    margin : 0;
    padding : 0;
    box-sizing : border-box;
    }
    
    /* Global body styles */
    body {
    font-family : 'Roboto', sans-serif;
    background-color : #f5f5f5;
    color : #333;
    }
    
    /* Global heading styles */
    h1, h2, h3, h4, h5, h6 {
    color: #333;
    margin-bottom: 16px;
    }
    
    /* Global link styles */
    a {
    color: #007bff;
    text-decoration: none;
    }
    
    /* Global button styles */
    button {
    padding: 10px 20px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    }
    
    button:hover {
    opacity: 0.9;
    }
`;

export default GlobalStyles