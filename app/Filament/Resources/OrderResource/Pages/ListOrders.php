<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOrders extends ListRecords
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => \Filament\Resources\Components\Tab::make('Semua'),
            'pending' => \Filament\Resources\Components\Tab::make('Pending')
                ->badge(\App\Models\Order::where('status', 'pending')->count())
                ->modifyQueryUsing(fn ($query) => $query->where('status', 'pending')),
            'diproses' => \Filament\Resources\Components\Tab::make('Diproses')
                ->badge(\App\Models\Order::where('status', 'diproses')->count())
                ->modifyQueryUsing(fn ($query) => $query->where('status', 'diproses')),
            'selesai' => \Filament\Resources\Components\Tab::make('Selesai')
                ->badge(\App\Models\Order::where('status', 'selesai')->count())
                ->modifyQueryUsing(fn ($query) => $query->where('status', 'selesai')),
            'dibatalkan' => \Filament\Resources\Components\Tab::make('Dibatalkan')
                ->modifyQueryUsing(fn ($query) => $query->where('status', 'dibatalkan')),
        ];
    }
}
