import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const ProductContainer = styled.div`
    padding: 20px;
    background-color: ${(props) => props.theme.colors.background};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProductImage = styled.img`
    max-width: 300px;
    height: auto;
    margin-bottom: 20px;
`;

const ProductTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
`;

const ProductDescription = styled.p`
font-size: 16px;
    margin-bottom: 10px;
`;

const ProductPrice = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
`;

const AddToCartButton = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
    }
`;

interface Product {
    id: string;
    title: string;
    description: string;
    discountedPrice: number;
    price: number;
    image: {
        url: string;
        alt: string;
    };
}

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();

        useEffect(() => {
            if (id) {
                fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Fetched product: ", data.data);
                    setProduct(data.data);
                })
                .catch((error) => console.error("Error fetching product:", error));
            }
        }, [id]);

        if (!product) {
            return <p>Loading...</p>;
        }

        // Safe checks for price and discountedPrice
        const price = product.price ?? 0;
        const discountedPrice = product.discountedPrice ?? 0;

        // Calculate the discount percentage
        const discount = price - discountedPrice;
        const discountedPercentage = price > 0 && discountedPrice > 0 ? ((discount / price) * 100).toFixed(0) : null;

        return (
            <ProductContainer>
                {/* Display the product image if it exists, otherwise use a fallback image */}
                {product.image ? (
                    <ProductImage src={product.image.url} alt={product.image.alt || product.title} />
                ) : (
                    <ProductImage src="https://via.placeholder.com/300" alt="Placeholder" />
                )}

                {/* Display product details */}
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>

                {/* Display the product price */}
                <ProductPrice>Price: {discountedPrice.toFixed(2)},-</ProductPrice>

                {/* Only show the discount percentage if there's a valid discount */}
                {discountedPercentage && (
                    <ProductPrice>Discount: {discountedPercentage}%</ProductPrice>
                )}
                
                {/* Add to Cart button */}
                <AddToCartButton onClick={() => addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.discountedPrice,
                    quantity: 1
                })}>
                    Add to Cart
                </AddToCartButton>
            </ProductContainer>
        );
    };

    export default ProductPage;