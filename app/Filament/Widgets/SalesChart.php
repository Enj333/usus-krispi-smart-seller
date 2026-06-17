<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;

class SalesChart extends ChartWidget
{
    protected static ?string $heading = 'Penjualan 7 Hari Terakhir';

    protected function getData(): array
    {
        $orders = Order::selectRaw('DATE(created_at) as date, SUM(total_price) as total')
            ->where('status', 'selesai')
            ->whereDate('created_at', '>=', now()->subDays(6))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Pendapatan',
                    'data' => $orders->pluck('total'),
                ],
            ],

            'labels' => $orders->pluck('date'),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}