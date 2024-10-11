import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react';

// Define the structure of a CartItem
interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

// CartContext interface
interface CartContextType {
    cartItems: CartItem [];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    cartCount: number;
}

// Create the CartContext with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};

// Create a provider component
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Add item to cart
    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                return prevItems.map((cartItem) => 
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.filter((cartItem) => cartItem.id !== id)
        );
    };

    // Increase quantity of an item
    const increaseQuantity = (id: string) => {
        setCartItems((prevItems) => 
            prevItems.map((cartItem) => 
                cartItem.id === id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
        );
    };

    // Decrease quantity of an item
    const decreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((cartItem) =>
                cartItem.id === id
                   ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
            .filter((cartItem) => cartItem.quantity > 0)
        );
    };

    // Clear cart
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Calculate total number of items in the cart
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};