<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $product->name }}</title>

    @vite('resources/css/app.css')
</head>
<body class="bg-orange-400 min-h-screen">

    <div class="max-w-md mx-auto bg-white min-h-screen">

        <!-- Gambar -->
        <div class="bg-blue-900 rounded-b-3xl p-6">

            <img
                src="{{ asset('storage/' . $product->image) }}"
                class="w-full h-72 object-cover rounded-2xl"
            >

        </div>

        <!-- Detail -->
        <div class="p-6">

            <h1 class="text-3xl font-bold text-gray-800">
                {{ $product->name }}
            </h1>

            <p class="text-orange-500 text-2xl font-bold mt-2">
                Rp {{ number_format($product->price) }}
            </p>

            <p class="text-gray-600 mt-4">
                {{ $product->description }}
            </p>

            <button
                class="w-full mt-8 bg-blue-900 text-white py-4 rounded-2xl font-bold"
            >
                Tambah ke Keranjang
            </button>

        </div>

    </div>

</body>
</html>