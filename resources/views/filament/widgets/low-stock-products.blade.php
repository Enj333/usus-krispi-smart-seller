<x-filament::section>
    <x-slot name="heading">
        ⚠ Produk Hampir Habis
    </x-slot>

    @if($products->count())
        <div class="space-y-2">
            @foreach($products as $product)
                <div class="flex justify-between">
                    <span>{{ $product->name }}</span>

                    <span class="font-bold text-danger-600">
                        {{ $product->stock }}
                    </span>
                </div>
            @endforeach
        </div>
    @else
        <div class="text-success-600">
            Semua stok masih aman 👍
        </div>
    @endif
</x-filament::section>