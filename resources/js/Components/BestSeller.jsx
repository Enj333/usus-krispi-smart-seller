export default function BestSeller() {
    return (
        <section className="container mx-auto px-6 py-24">

            <div className="bg-orange-500 rounded-[40px] overflow-hidden">

                <div className="grid md:grid-cols-2 items-center">

                    {/* LEFT */}
                    <div className="p-10 md:p-16">

                        <p className="uppercase tracking-[5px] text-orange-100">
                            Best Seller
                        </p>

                        <h2 className="text-5xl font-black text-white mt-4 leading-tight">
                            Usus Level
                            Sultan 🔥
                        </h2>

                        <p className="text-orange-100 mt-6 text-lg">
                            Pedas maksimal dengan bumbu premium
                            yang bikin pelanggan balik lagi.
                        </p>

                        <button className="mt-8 bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition">
                            Order Sekarang
                        </button>

                    </div>

                    {/* RIGHT */}
                    <div className="flex justify-center p-10">

                        <img
                            src="/images/usus.png"
                            className="w-80 drop-shadow-2xl"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}