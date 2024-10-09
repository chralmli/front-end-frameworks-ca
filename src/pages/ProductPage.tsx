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
    color: ${(props) => props.theme.colors.text};
`;

const ProductDescription = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};
    line-height: 1.5;
`;

const ProductPrice = styled.p`
    font-size: 18px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};

    &.discounted {
        color: #D32F2F;
        font-weight: bold;
    }
`;

const OriginalPrice = styled.span`
    font-size: 16px;
    text-decoration: line-through;
    margin-right: 10px;
    color: #888;
`;

const DiscountInfo = styled.span`
    color: #e63946;
    font-weight: bold;
    margin-left: 10px;
`;

const AddToCartButton = styled.button`
    padding: 12px 20px;
    background-color: #e63946;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #d62839;
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

        // Calculate the discount percentage only if there is a discount
        const discountedPercentage = 
            price > 0 && discountedPrice > 0 && price > discountedPrice
                ? ((1 - discountedPrice / price) * 100).toFixed(0)
                : null;

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
                {discountedPercentage ? (
                    <>
                        <ProductPrice className="discounted">
                            {discountedPrice.toFixed(2)},-
                        </ProductPrice>
                        <ProductPrice>
                            <OriginalPrice>{price.toFixed(2)},-</OriginalPrice>
                            <DiscountInfo>{discountedPercentage}% off</DiscountInfo>
                        </ProductPrice>
                    </>
                ) : (
                    <ProductPrice>{price.toFixed(2)},-</ProductPrice>
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