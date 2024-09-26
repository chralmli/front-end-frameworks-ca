import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    color: ${(props) => props.theme.colors.primary};`

interface Product {
    id: string;
    title: string;
    discountedPrice: number;
    imageUrl: string;
}

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://v2.api.noroff.dev/online-shop')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <Container>
            <Title>Products</Title>
            <ProductList>
                {products.map((product) => (
                    <ProductCard key={product.id}>
                        <ProductImage src={product.imageUrl} alt={product.title} />
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductPrice>Price: {product.discountedPrice}</ProductPrice>
                    </ProductCard>
                ))}
            </ProductList>
        </Container>
    );
};

export default HomePage;