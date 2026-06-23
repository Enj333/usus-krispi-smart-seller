import { router } from '@inertiajs/react';

export default function BestSeller({ product }) {
    if (!product) return null;

    const handleOrder = () => {
        router.post(
            `/cart/add/${product.id}`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <section className="container mx-auto px-6 py-12">
            <div className="bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden relative shadow-2xl">
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="grid md:grid-cols-12 items-center">
                    {/* LEFT COLUMN */}
                    <div className="p-10 md:p-16 md:col-span-7 space-y-6">
                        <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                            ⭐ Paling Terlaris
                        </span>

                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            {product.name}
                            {product.variant && (
                                <span className="text-orange-500 block text-2xl md:text-3xl mt-1">
                                    Varian: {product.variant}
                                </span>
                            )}
                        </h2>

                        <p className="text-slate-400 text-lg leading-relaxed font-medium">
                            {product.description || 'Nikmati sensasi usus krispi premium renyah berpadu dengan bumbu pilihan spesial khas kami!'}
                        </p>

                        <div className="flex items-center gap-6 pt-4">
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Harga Terlaris</p>
                                <p className="text-3xl font-black text-orange-500 mt-1">
                                    Rp {Number(product.price).toLocaleString('id-ID')}
                                </p>
                            </div>

                            <button
                                onClick={handleOrder}
                                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
                            >
                                Ambil Porsi Ini 🛒
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="p-10 md:col-span-5 flex justify-center bg-slate-950/40 h-full border-t md:border-t-0 md:border-l border-slate-800/80">
                        <div className="w-72 h-72 rounded-[32px] overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-2 relative group shadow-inner">
                            {product.image ? (
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500"
                                />
                            ) : (
                                <img
                                    src="/images/fox_mascot.png"
                                    alt="Default Best Seller"
                                    className="w-48 h-48 object-contain opacity-80"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}