<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use Filament\Widgets\Widget;

class LowStockProducts extends Widget
{
    protected static string $view = 'filament.widgets.low-stock-products';

    protected int|string|array $columnSpan = 'full';

    public function getViewData(): array
    {
        return [
            'products' => Product::where('stock', '<=', 5)
                ->orderBy('stock')
                ->get(),
        ];
    }
}