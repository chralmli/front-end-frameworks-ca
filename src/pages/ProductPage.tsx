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

const ReviewsSection = styled.div`
    margin-top: 30px;
    width: 80%;
`;

const ReviewTitle = styled.h3`
    margin-bottom: 15px;
    color: ${(props) => props.theme.colors.text};
`;

const ReviewList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ReviewItem = styled.li`
    background: ${(props) => props.theme.colors.background};
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
`;

const ReviewAuthor = styled.h4`
    font-size: 16px;
    color: ${(props) => props.theme.colors.text};
    margin: 0;
`;

const ReviewText = styled.p`
    color: ${(props) => props.theme.colors.text};
    margin: 5px 0;
`;

const ReviewRating = styled.span`
    display: inline-block;
    background-color: #ffd700;
    color: 333;
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 3px;
    margin-top: 5px;
`;

interface Review {
    username: string;
    description: string;
    rating: number;
}

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
    reviews: Review[];
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
                    quantity: 1,
                    imageUrl: product.image.url,
                })}>
                    Add to Cart
                </AddToCartButton>

                {/* Reviews Section */}
                <ReviewsSection>
                    <ReviewTitle>Customer Reviews</ReviewTitle>
                    {product.reviews && product.reviews.length > 0 ? (
                        <ReviewList>
                            {product.reviews.map((review, index) => (
                                <ReviewItem key={index}>
                                    <ReviewAuthor>{review.username}</ReviewAuthor>
                                    <ReviewText>{review.description}</ReviewText>
                                    <ReviewRating>{review.rating} out of 5</ReviewRating>
                                </ReviewItem>
                            ))}
                        </ReviewList>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </ReviewsSection>
            </ProductContainer>
        );
    };

    export default ProductPage;