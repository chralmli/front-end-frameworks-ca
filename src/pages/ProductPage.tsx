import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

// Import the environment variable
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const ProductContainer = styled.div`
    padding: 20px;
    background-color: ${(props) => props.theme.colors.background};
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 15px;
        max-width: 100%;
    }
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #09f;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    margin: 20px auto;

    @keyframes spin {
        100% { 
            transform: rotate(360deg); 
        }
    }
`;

const ProductImage = styled.img`
    max-width: 300px;
    height: auto;
    margin-bottom: 20px;
    border-radius: 10px;

    @media (max-width: 768px) {
        max-width: 250px;
    }
`;

const ProductTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const ProductDescription = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};
    line-height: 1.5;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const ProductPrice = styled.p`
    font-size: 18px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};

    &.discounted {
        color: #D32F2F;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const OriginalPrice = styled.span`
    font-size: 16px;
    text-decoration: line-through;
    margin-right: 10px;
    color: #888;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const DiscountInfo = styled.span`
    color: #e63946;
    font-weight: bold;
    margin-left: 10px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
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

    @media (max-width: 768px) {
        padding: 10px 15px;
    }
`;

const AddedNotification = styled.div`
    position: fixed;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    padding: 10px;
    background-color: #38a169;
    color: white;
    border-radius: 5px;
    animation: fadeOut 3s forwards;

    @keyframes fadeOut {
        0% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; }
    }
`;

const ReviewsSection = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 8rem auto;

    @media (max-width: 768px) {
        padding: 0 15px;
    }
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
    max-width: 100%;
    width: 100%;

    @media (max-width: 768px) {
        padding: 12px;
    }
`;

const ReviewAuthor = styled.h4`
    font-size: 16px;
    color: ${(props) => props.theme.colors.text};
    margin: 0;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const ReviewText = styled.p`
    color: ${(props) => props.theme.colors.secondaryText};
    margin: 5px 0;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const ReviewRating = styled.span`
    display: inline-block;
    background-color: #ffd700;
    color: #333;
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 3px;
    margin-top: 5px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const NoReviews = styled.p`
    color: ${(props) => props.theme.colors.text};
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
    const [loading, setLoading] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`${apiUrl}/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
        }
    }, [id]);

    // If the product is still loading, display a spinner
    if (loading) {
        return <Spinner />;
    }

    // If product is null, display a message
    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.discountedPrice,
                quantity: 1,
                imageUrl: product.image.url,
            });

            // Show the "Added to Cart" notification
            setShowNotification(true);

            // Hide the notification after 3 seconds
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

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
                {product.discountedPrice < product.price ? (
                <>
                <ProductPrice className="discounted">
                    {product.discountedPrice.toFixed(2)},-
                </ProductPrice>
                <ProductPrice>
                    <OriginalPrice>{product.price.toFixed(2)},-</OriginalPrice>
                    <DiscountInfo>{((1 - product.discountedPrice / product.price) * 100).toFixed(0)}% off</DiscountInfo>
                </ProductPrice>
                </>
            ) : (
                <ProductPrice>{product.price.toFixed(2)},-</ProductPrice>
            )}
                
            {/* Add to Cart button */}
            <AddToCartButton onClick={handleAddToCart}>
                Add to Cart
            </AddToCartButton>

            {/* Display the "Added to Cart" notification */}
            {showNotification && <AddedNotification>Item added to cart!</AddedNotification>}

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
                    <NoReviews>No reviews yet.</NoReviews>
                )}
            </ReviewsSection>
        </ProductContainer>
    );
};

    export default ProductPage;