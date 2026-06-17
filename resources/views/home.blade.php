<!DOCTYPE html>
<html lang="en" class="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PUR SAJI</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-black text-white min-h-screen">

    <section class="container mx-auto px-6 py-10">

        <!-- NAVBAR -->
        <div class="flex items-center justify-between">

            <div>
                <h1 class="text-4xl font-black">
                    PUR SAJI 🔥
                </h1>

                <p class="text-zinc-400 mt-1">
                    Cemilan pedas bikin nagih
                </p>
            </div>

            <button class="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-bold">
                Cart 🛒
            </button>

        </div>

        <!-- HERO -->
        <div class="grid md:grid-cols-2 gap-10 items-center mt-20">

            <!-- LEFT -->
            <div>

                <span class="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm">
                    Best Seller
                </span>

                <h1 class="text-6xl font-black leading-tight mt-6">
                    Cemilan Pedas
                    Bikin Nagih 🌶️
                </h1>

                <p class="text-zinc-400 text-lg mt-6 leading-relaxed">
                    Usus kriuk premium dengan bumbu spesial
                    yang bikin pelanggan ketagihan setiap hari.
                </p>

                <div class="flex gap-4 mt-8">

                    <button class="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl font-bold">
                        Pesan Sekarang
                    </button>

                    <button class="border border-zinc-700 hover:bg-zinc-900 transition px-8 py-4 rounded-2xl">
                        Lihat Menu
                    </button>

                </div>

            </div>

            <!-- RIGHT -->
            <div class="flex justify-center">

                <div class="bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 shadow-2xl">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
                        class="w-80">

                </div>

            </div>

        </div>

        <!-- PRODUK -->
        <div class="mt-28">

            <div class="flex justify-between items-center mb-10">

                <div>
                    <h2 class="text-4xl font-black">
                        Menu Kami
                    </h2>

                    <p class="text-zinc-400 mt-2">
                        Pilih menu favoritmu 🔥
                    </p>
                </div>

            </div>

            <!-- GRID -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                @foreach ($products as $product)

                    <div class="bg-zinc-900 border border-zinc-800 rounded-[30px] p-5 hover:-translate-y-2 transition duration-300">

                        <!-- IMAGE -->
                        <div class="bg-zinc-800 rounded-[25px] overflow-hidden h-60">

                            <img
                                src="{{ asset('storage/' . $product->image) }}"
                                class="w-full h-full object-cover">

                        </div>

                        <!-- CONTENT -->
                        <div class="mt-5">

                            <h3 class="text-2xl font-black">
                                {{ $product->name }}
                            </h3>

                            <p class="text-zinc-400 mt-2">
                                {{ $product->description }}
                            </p>

                            <div class="flex items-center justify-between mt-6">

                                <div>
                                    <p class="text-zinc-500 text-sm">
                                        Harga
                                    </p>

                                    <h1 class="text-2xl font-black text-orange-400">
                                        Rp {{ number_format($product->price) }}
                                    </h1>
                                </div>

                                <form action="{{ route('cart.add', $product->id) }}" method="POST">
                                    @csrf

                                    <button
                                        class="bg-orange-500 hover:bg-orange-600 w-14 h-14 rounded-2xl text-2xl font-bold transition">
                                        +
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                @endforeach

            </div>

        </div>

    </section>

</body>

</html>