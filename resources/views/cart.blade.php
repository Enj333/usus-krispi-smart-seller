<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Cart</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-orange-400 min-h-screen">

    <div class="max-w-2xl mx-auto py-10 px-6">

        <div class="flex justify-between items-center mb-10">

            <h1 class="text-4xl font-black text-white">
                Keranjang 🛒
            </h1>

            <a
                href="/"
                class="bg-blue-900 text-white px-5 py-3 rounded-full"
            >
                Kembali
            </a>

        </div>

        @php
            $total = 0;
        @endphp

        @forelse($cart as $id => $item)

            @php
                $total += $item['price'] * $item['quantity'];
            @endphp

            <div class="bg-white rounded-3xl p-5 mb-6 shadow-xl">

                <div class="flex gap-5">

                    <img
                        src="{{ asset('storage/' . $item['image']) }}"
                        class="w-28 h-28 object-cover rounded-2xl"
                    >

                    <div class="flex-1">

                        <h2 class="text-2xl font-bold text-gray-800">
                            {{ $item['name'] }}
                        </h2>

                        <p class="text-orange-500 font-bold text-xl mt-2">
                            Rp {{ number_format($item['price']) }}
                        </p>

                        <div class="flex justify-between items-center mt-5">

                            <div class="bg-orange-100 px-4 py-2 rounded-full">
                                Qty: {{ $item['quantity'] }}
                            </div>

                            <p class="font-black text-lg">
                                Rp {{ number_format($item['price'] * $item['quantity']) }}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        @empty

            <div class="bg-white rounded-3xl p-10 text-center">

                <h2 class="text-2xl font-bold text-gray-700">
                    Cart masih kosong 😭
                </h2>

            </div>

        @endforelse

        <!-- TOTAL -->
        <div class="bg-blue-900 rounded-3xl p-6 mt-10 text-white shadow-2xl">

            <div class="flex justify-between items-center">

                <div>

                    <p class="text-blue-200">
                        Total Harga
                    </p>

                    <h1 class="text-4xl font-black mt-2">
                        Rp {{ number_format($total) }}
                    </h1>

                </div>

                <button class="bg-orange-400 px-8 py-4 rounded-full text-xl font-bold">
                    Checkout
                </button>

            </div>

        </div>

    </div>

</body>
</html>