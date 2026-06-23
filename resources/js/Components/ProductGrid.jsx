import { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, variants = [] }) {
    const [selectedVariant, setSelectedVariant] = useState('Semua');

    // Make categories list unique and fallback to list of variants
    const categories = ['Semua', ...new Set(variants || [])];

    const filteredProducts = selectedVariant === 'Semua'
        ? products
        : products.filter((p) => p.variant === selectedVariant);

    return (
        <section id="menu" className="bg-slate-900/20 border-t border-slate-900/80 py-20 scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 space-y-4">
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">
                        🛍️ Pilihan Menu
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        MENU KAMI
                    </h2>

                    <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full" />

                    <p className="text-slate-400 text-lg max-w-md mx-auto font-medium">
                        Temukan cita rasa usus krispi premium favoritmu
                    </p>
                </div>

                {/* CATEGORY BUTTONS */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => {
                            const isActive = selectedVariant === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setSelectedVariant(category)}
                                    className={`px-6 py-3 rounded-2xl font-black text-sm tracking-wider uppercase transition-all duration-350 ${
                                        isActive
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* PRODUCT GRID */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-900 border-dashed">
                        <img 
                            src="/images/fox_mascot.png" 
                            alt="Empty products" 
                            className="w-28 h-28 object-contain mx-auto opacity-30 mb-4" 
                        />
                        <p className="text-slate-500 font-bold text-lg">Tidak ada produk dalam kategori ini.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}