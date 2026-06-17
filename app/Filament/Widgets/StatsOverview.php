<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Product;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Product', Product::count())
                ->description('Jumlah produk')
                ->color('success'),

            Stat::make('Total Order', Order::count())
                ->description('Jumlah pesanan')
                ->color('primary'),

            Stat::make(
                'Pendapatan',
                'Rp ' . number_format(Order::sum('total_price'))
            )
                ->description('Total semua pesanan')
                ->color('warning'),
        ];
    }
}