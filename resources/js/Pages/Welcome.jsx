import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import BestSeller from '@/components/BestSeller';
import CartSidebar from '@/components/CartSidebar';
import { useState } from 'react';

export default function Welcome({ products, bestSeller, variants, cart }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartCount = Object.values(cart || {}).reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-orange-500 selection:text-white">
            <Navbar
                openCart={() => setIsCartOpen(true)}
                cartCount={cartCount}
            />

            {isCartOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-all"
                        onClick={() => setIsCartOpen(false)}
                    />

                    <CartSidebar 
                        cart={cart}
                        onClose={() => setIsCartOpen(false)} />
                </>
            )}

            <Hero />

            {bestSeller && (
                <div id="best-seller" className="scroll-mt-20">
                    <BestSeller product={bestSeller} />
                </div>
            )}

            <ProductGrid products={products} variants={variants} />
        </main>
    );
}
