import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log('API URL:', apiUrl);

const Container = styled.div`
    padding: 60px 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;


    @media (max-width: 768px) {
        padding: 40px 10px;
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

const Title = styled.h1`
    color: ${(props) => props.theme.colors.text};
    font-size: 36px;
    margin-bottom: 50px;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;

    @media (max-width: 768px) {
        font-size: 28px;
    }
`;

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        max-width: 90%;
    }
`

const SearchInput = styled.input`
    padding: 10px;
    font-size: 16px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

const SearchResults = styled.div`
    width: 100%;
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    position: absolute;
    z-index: 10;
    margin-top 5px;
`;

const SearchResultItem = styled.div`
    display: block;
    padding: 10px;
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
    cursor: pointer;
    border-bottom: 1px solid #ddd;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f1f1f1;
    }
`;

const NoSearchResult = styled.p`
    color: ${(props) => props.theme.colors.text};
`

const ProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    width: 100%;
    max-width: 1400px;
    justify-items: center;

    @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }
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
        
    @media (max-width: 768px) {
        width: 250px;
        padding: 15px;
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

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

const ProductPrice = styled.p`
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 600;
    font-size: 16px;
    margin: 5px 0 15px;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
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

    @media (max-width: 768px) {
        padding: 10px 15px;
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
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`${apiUrl}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
        }, []);

        // Handle the filtering of products based on the search input
        useEffect(() => {
            if (searchInput.length > 0) {
                const results = products.filter((product) =>
                    product.title.toLowerCase().includes(searchInput.toLowerCase())
                );
                setFilteredProducts(results);
                setSearchResultsVisible(true);
            } else {
                setSearchResultsVisible(false);
            }
        }, [searchInput, products]);

        // Handle navigation to the product page when clicking on a search result
        const handleProductClick = (id: string) => {
            setSearchResultsVisible(false);
            navigate(`/product/${id}`);
        };

        // Handle clicks outside of the search results to close the dropdown
        useEffect(() => {
            const handleClickOutSide = (event: MouseEvent) => {
                if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                    setSearchResultsVisible(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutSide);

            return () => {
                document.removeEventListener("mousedown", handleClickOutSide);
            };
        }, []);

    return (
        <Container>
            <Title>Products</Title>

            {/* Ref on the search container to detect clicks outside */}
            <SearchContainer ref={searchContainerRef}>
                <SearchInput
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                {/* Display search results */}
                {searchResultsVisible && (
                    <SearchResults>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                            <SearchResultItem
                                key={product.id}
                                onClick={() => handleProductClick(product.id)}
                            >
                                {product.title}
                            </SearchResultItem>
                        ))
                    ) : (
                            <NoSearchResult>No results found</NoSearchResult>
                        )}
                    </SearchResults>
                )}
            </SearchContainer>

            {loading ? (
                <Spinner />
            ) : (
            <ProductList>
                    {products.map((product) => (
                        <ProductCard key={product.id}>
                            <ProductImage src={product.image.url} alt={product.image.alt || product.title} />
                            <ProductTitle>{product.title}</ProductTitle>
                            <ProductPrice>Price: {product.discountedPrice},-</ProductPrice>
                            <ViewButton to={`/product/${product.id}`}>View Product</ViewButton>
                        </ProductCard>
                    ))}
            </ProductList>
            )}
        </Container>
    );
};

export default HomePage;