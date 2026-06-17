<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\OrderItem;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class SalesStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [

            Stat::make(
                'Order Hari Ini',
                Order::whereDate('created_at', today())->count()
            ),

            Stat::make(
                'Pendapatan Hari Ini',
                'Rp ' . number_format(
                    Order::whereDate('created_at', today())
                        ->sum('total_price'),
                    0,
                    ',',
                    '.'
                )
            ),

            Stat::make(
                'Produk Terjual Hari Ini',
                OrderItem::whereDate('created_at', today())
                    ->sum('quantity')
            ),

            Stat::make(
                'Total Order',
                Order::count()
            ),

            Stat::make(
                'Total Pendapatan',
                'Rp ' . number_format(
                    Order::sum('total_price'),
                    0,
                    ',',
                    '.'
                )
            ),

        ];
    }
}