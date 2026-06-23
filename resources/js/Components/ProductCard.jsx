import { router } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const handleAdd = () => {
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
        <div className="bg-slate-900 border border-slate-850 hover:border-orange-500/40 rounded-[30px] overflow-hidden shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
            <div>
                {/* PRODUCT IMAGE */}
                <div className="h-48 bg-slate-950/40 flex items-center justify-center relative overflow-hidden p-3">
                    {product.image ? (
                        <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-800">
                            <img
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full rounded-2xl bg-slate-900/50 flex items-center justify-center border border-slate-800/80">
                            <img 
                                src="/images/fox_mascot.png" 
                                alt="Default Product" 
                                className="w-24 h-24 object-contain opacity-55 group-hover:opacity-85 transition-opacity" 
                            />
                        </div>
                    )}

                    {product.variant && (
                        <span className="absolute top-5 right-5 bg-slate-950/70 backdrop-blur-md text-orange-400 border border-orange-500/30 text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                            {product.variant}
                        </span>
                    )}
                </div>

                <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-slate-400 text-sm line-clamp-2 min-h-[40px]">
                        {product.description || 'Nikmati sensasi krispi renyah berpadu dengan racikan bumbu rempah spesial pilihan.'}
                    </p>
                </div>
            </div>

            <div className="p-6 pt-0">
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Harga</p>
                        <p className="text-xl font-black text-orange-500 mt-0.5">
                            Rp {Number(product.price).toLocaleString('id-ID')}
                        </p>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl transition shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-95"
                    >
                        + Tambah
                    </button>
                </div>
            </div>
        </div>
    );
}
