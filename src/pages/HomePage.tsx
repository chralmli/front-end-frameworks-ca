import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log('API URL:', apiUrl);

const Container = styled.div`
    padding: 60px 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.colors.text};
    font-size: 36px;
    margin-bottom: 50px;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
`;

const ProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    width: 100%;
    max-width: 1400px;
    justify-items: center;
`;

const ProductCard = styled.div`
    background-color: ${(props) => props.theme.colors.cardBackground};
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 300px;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
`;

const ProductImage = styled.img`
    height: 200px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 15px;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 8px;
    padding-bottom: 15px;
`;

const ProductTitle = styled.h2`
    font-size: 20px;
    margin: 15px 0 10px;
    color: ${(props) => props.theme.colors.text};
    font-weight: 700;
    font-family: "Roboto", sans-serif;
    line-height: 1.3;
`;

const ProductPrice = styled.p`
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 600;
    font-size: 16px;
    margin: 5px 0 15px;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.5px;
`;

const ViewButton = styled(Link)`
    display: inline-block;
    padding: 12px 20px;
    margin-top: 15px;
    color: white;
    background-color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    
    &:hover {
        background-color: #d62839;
        transform: translateY(-2px);
    }
`;

interface Product {
    id: string;
    title: string;
    discountedPrice: number;
    image: {
        url: string;
        alt: string;
    };
}

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`${apiUrl}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response Data:", data);
                console.log("Extracted Product Data", data.data);
                setProducts(data.data);
            })
            .catch((error) => console.error("Error fetching products:", error));
            }, []);

    return (
        <Container>
            <Title>Products</Title>
            <ProductList>
                {Array.isArray(products) ? (
                    products.map((product) => (
                        <ProductCard key={product.id}>
                            <ProductImage src={product.image.url} alt={product.image.alt || product.title} />
                            <ProductTitle>{product.title}</ProductTitle>
                            <ProductPrice>Price: {product.discountedPrice},-</ProductPrice>

                            <ViewButton to={`/product/${product.id}`}>View Product</ViewButton>
                        </ProductCard>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </ProductList>
        </Container>
    );
};

export default HomePage;