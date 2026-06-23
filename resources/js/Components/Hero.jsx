export default function Hero() {
    return (
        <section className="relative bg-slate-950 overflow-hidden min-h-[75vh] flex items-center">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-6 py-16 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 text-left space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 uppercase tracking-widest">
                            🔥 Cemilan Pedas Premium
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                            Kriuknya <span className="text-orange-500">Pecah</span>,<br />
                            Pedasnya <span className="text-orange-500">Nagih!</span>
                        </h1>

                        <p className="text-slate-400 text-lg lg:text-xl max-w-xl leading-relaxed font-medium">
                            Usus krispi higienis berbalut bumbu rempah rahasia. Pesan online sekarang, langsung ambil di booth kami tanpa antre!
                          </p>

                        <div className="pt-6 flex flex-wrap gap-4">
                            <a
                                href="#menu"
                                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-orange-500/30 flex items-center gap-2 group"
                            >
                                Pesan Sekarang
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                            <a
                                href="#best-seller"
                                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-lg rounded-2xl transition border border-slate-800"
                            >
                                Lihat Terlaris
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-5 flex justify-center relative">
                        {/* Circle decorative background */}
                        <div className="absolute inset-0 m-auto w-72 h-72 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-full opacity-20 blur-2xl animate-pulse" />
                        
                        <div className="relative bg-slate-900/40 p-8 rounded-[40px] border border-slate-900 backdrop-blur-md shadow-2xl flex flex-col items-center">
                            <div className="w-64 h-64 bg-orange-500/10 rounded-full flex items-center justify-center p-6 border border-orange-500/20 shadow-inner">
                                <img 
                                    src="/images/fox_mascot.png" 
                                    alt="Usus Krispi Mascot" 
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                            <span className="mt-6 text-orange-400 font-black tracking-widest uppercase text-xs">
                                #JagonyaUsusKriuk
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
