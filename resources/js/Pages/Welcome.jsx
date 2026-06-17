import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import BestSeller from '@/components/BestSeller';
import CartSidebar from '@/components/CartSidebar';
import { useState } from 'react';

export default function Welcome({ products, cart }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartCount = Object.values(cart || {}).reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar
                openCart={() => setIsCartOpen(true)}
                cartCount={cartCount}
            />

            {isCartOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 z-40"
                        onClick={() => setIsCartOpen(false)}
                    />

                    <CartSidebar 
                        cart={cart}
                        onClose={() => setIsCartOpen(false)} />
                </>
            )}

            <Hero />

            <ProductGrid products={products} />

            <BestSeller />
        </main>
    );
}
