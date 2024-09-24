import React, { useEffect, useState } from 'react';

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
        <div>
            <h1>Products</h1>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.title}</h2>
                        <img src={product.imageUrl} alt={product.title} />
                        <p>Price: {product.discountedPrice}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;