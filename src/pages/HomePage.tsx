import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    padding: 20px;
    background-color: ${(props) => props.theme.colors.background};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.colors.primary};
`;

const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProductCard = styled.div`
    background-color: white;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px;
    width: 200px;
    text-align: center;
`;

const ProductImage = styled.img`
    max-width: 100%;
    height: auto;
`;

const ProductTitle = styled.h2`
    font-size: 18px;
    margin: 10px 0;
`;

const ProductPrice = styled.p`
    color: ${(props) => props.theme.colors.primary};
`;

const ViewButton = styled(Link)`
    display: inline-block;
    padding: 10px 15px;
    margin-top: 10px;
    color: white;
    background-color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    border-radius: 5px;
    
    &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
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
        fetch('https://v2.api.noroff.dev/online-shop')
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