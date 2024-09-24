import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the structure of a CartItem
interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
}

// Create the CartContext interface
interface CartContextType {
    cartItems: CartItem [];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

// Create the CartContext with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

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

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};