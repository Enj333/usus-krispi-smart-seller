<?php

namespace App\Filament\Widgets;

use App\Models\OrderItem;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class TopProductsChart extends ChartWidget
{
    protected static ?string $heading = 'Produk Terlaris';

    protected function getData(): array
    {
        $products = OrderItem::select(
                'products.name',
                DB::raw('SUM(order_items.quantity) as total')
            )
            ->join('products', 'products.id', '=', 'order_items.product_id')
            ->groupBy('products.name')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Terjual',
                    'data' => $products->pluck('total'),
                ],
            ],

            'labels' => $products->pluck('name'),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}