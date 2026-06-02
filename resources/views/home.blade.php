<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Usus Krispi Smart Seller</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-orange-400 min-h-screen overflow-x-hidden">

    <!-- HERO -->
    <section class="relative">

        <!-- BULAT BG -->
        <div class="absolute -top-32 -right-32 w-72 h-72 bg-orange-300 rounded-full opacity-40"></div>

        <div class="container mx-auto px-6 py-10 relative z-10">

            <!-- NAVBAR -->
            <div class="flex justify-between items-center">

                <div>

                    <h1 class="text-white text-4xl font-extrabold">
                        PUR SAJI
                    </h1>

                    <p class="text-orange-100 text-sm">
                        Teman santai yang bikin nagih
                    </p>

                </div>

                @php
                $totalCart = 0;

                foreach($cart as $item){
                $totalCart += $item['quantity'];
                }
                @endphp

                <a href="{{ route('cart') }}"
                    class="relative bg-blue-900 text-white px-5 py-3 rounded-full shadow-lg">

                    🛒

                    @if($totalCart > 0)

                    <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                        {{ $totalCart }}
                    </span>

                    @endif

                </a>

            </div>

            <!-- CONTENT -->
            <div class="grid md:grid-cols-2 gap-10 items-center mt-16">

                <!-- LEFT -->
                <div>

                    <p class="text-white uppercase tracking-widest">
                        Best Seller
                    </p>

                    <h1 class="text-5xl md:text-6xl font-black text-white leading-tight mt-4">
                        Cemilan Pedas
                        Bikin Nagih 🔥
                    </h1>

                    <p class="text-orange-100 mt-6 text-lg leading-relaxed">
                        Usus kriuk dengan bumbu spesial
                        yang bikin ketagihan setiap gigitan.
                    </p>

                    <div class="flex gap-4 mt-8">

                        <a href="{{ route('cart') }}"
                            class="relative bg-blue-900 text-white px-5 py-3 rounded-full shadow-lg">
                            Pesan Sekarang
                        </a>

                        <a href="{{ route('cart') }}">
                            Menu
                        </a>

                    </div>

                </div>

                <!-- RIGHT -->
                <div class="flex justify-center">

                    <div class="relative">

                        <div class="absolute inset-0 bg-white blur-3xl opacity-20 rounded-full"></div>

                        <div class="bg-blue-900 rounded-[50px] p-8 w-80 h-80 flex items-center justify-center shadow-2xl relative">

                            <img
                                src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                                class="w-56 drop-shadow-2xl">

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </section>

    <!-- PRODUK -->
    <section class="bg-blue-900 rounded-t-[60px] mt-20 min-h-screen">

        <div class="container mx-auto px-6 py-10">

            <!-- TITLE -->
            <div class="flex justify-between items-center mb-10">

                <div>

                    <h2 class="text-4xl font-black text-white">
                        Menu Kami
                    </h2>

                    <p class="text-blue-200 mt-2">
                        Pilih cemilan favoritmu 🔥
                    </p>

                </div>

                <a href="{{ route('cart') }}" class="bg-white text-blue-900 px-6 py-3 rounded-full font-bold shadow-lg">
                    Cart
                </a>

            </div>

            <!-- GRID -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                @foreach ($products as $product)

                <div class="bg-orange-400 rounded-[35px] p-5 shadow-2xl hover:scale-[1.02] transition duration-300">

                    <!-- IMAGE -->
                    <div class="bg-white rounded-[30px] overflow-hidden h-56">

                        <img
                            src="{{ asset('storage/' . $product->image) }}"
                            class="w-full h-full object-cover">

                    </div>

                    <!-- CONTENT -->
                    <div class="mt-5">

                        <h3 class="text-white text-2xl font-black">
                            {{ $product->name }}
                        </h3>

                        <p class="text-orange-100 mt-2 line-clamp-2">
                            {{ $product->description }}
                        </p>

                        <div class="flex justify-between items-center mt-6">

                            <div>

                                <p class="text-orange-100 text-sm">
                                    Harga
                                </p>

                                <p class="text-white font-black text-2xl">
                                    Rp {{ number_format($product->price) }}
                                </p>

                            </div>

                            <form action="{{ route('cart.add', $product->id) }}" method="POST">
                                @csrf

                                <button
                                    class="bg-blue-900 w-14 h-14 rounded-full text-white text-2xl shadow-lg hover:rotate-90 transition">
                                    +
                                </button>
                            </form>

                        </div>

                    </div>

                </div>

                @endforeach

            </div>

            <!-- BUTTON -->
            <div class="flex justify-center mt-14">

                <button
                    class="bg-orange-400 hover:bg-orange-500 transition text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl">
                    Preorder Sekarang
                </button>

            </div>

        </div>

    </section>

</body>

</html>