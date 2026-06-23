export default function Navbar({ openCart, cartCount }) {
    return (
        <nav className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* LOGO USAHA */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full overflow-hidden flex items-center justify-center p-0.5 border-2 border-orange-400 shadow-md">
                        <img 
                            src="/images/fox_mascot.png" 
                            alt="Fox Mascot" 
                            className="w-full h-full object-cover scale-105" 
                        />
                    </div>

                    <div>
                        <h1 className="text-white font-black text-xl tracking-wide">
                            USUS <span className="text-orange-500">KRISPI</span>
                        </h1>

                        <p className="text-slate-400 text-xs font-semibold">
                            Pedas • Gurih • Renyah
                        </p>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4">
                    <a 
                        href="/admin" 
                        className="text-slate-400 hover:text-orange-500 text-sm font-semibold transition hidden sm:inline-block"
                    >
                        Dashboard Admin
                    </a>

                    <button
                        onClick={openCart}
                        className="relative bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-2xl text-white font-bold transition flex items-center gap-2 shadow-lg shadow-orange-500/20"
                    >
                        <span>🛒</span>
                        <span className="hidden sm:inline">Keranjang</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-slate-950 text-orange-500 text-xs w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center font-black animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
