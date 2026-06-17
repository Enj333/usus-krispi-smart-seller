export default function Hero() {
    return (
        <section className="container mx-auto px-6 py-20">

            <div className="grid md:grid-cols-2 gap-10 items-center">

                <div>

                    <h1 className="text-6xl font-black leading-tight">
                        Cemilan Pedas
                        <span className="text-orange-500">
                            {" "}Bikin Nagih 🔥
                        </span>
                    </h1>

                    <p className="text-zinc-400 text-lg mt-6">
                        Usus kriuk premium dengan rasa yang bikin ketagihan.
                    </p>

                    <button className="mt-8 bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-full text-white font-bold">
                        Pesan Sekarang
                    </button>

                </div>

                <div className="flex justify-center">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
                        className="w-96"
                    />

                </div>

            </div>

        </section>
    );
}