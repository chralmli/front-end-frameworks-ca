import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
    id: string;
    title: string;
    description: string;
    discountedPrice: number;
    price: number;
    imageUrl: string;
}

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();

        useEffect(() => {
            fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
                .then(response => response.json())
                .then(data => setProduct(data));
        }, [id]);

        if (!product) {
            return <p>Loading...</p>;
        }

        const discount = product.price - product.discountedPrice;
        const discountedPercentage = ((discount / product.price) * 100).toFixed(0);

        return (
            <div>
                <h1>{product.title}</h1>
                <img src={product.imageUrl} alt={product.title} />
                <p>{product.description}</p>
                <p>Price: {product.discountedPrice}</p>
                <p>Discount: {discountedPercentage}%</p>
                <button onClick={() => addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.discountedPrice,
                    quantity: 1
                })}>
                    Add to Cart
                </button>
            </div>
        );
    };

    export default ProductPage;