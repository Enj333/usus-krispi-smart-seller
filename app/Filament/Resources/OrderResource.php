<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\RelationManagers\OrderItemsRelationManager;
use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('customer_name')
                    ->disabled(),

                Forms\Components\TextInput::make('phone')
                    ->disabled(),

                Forms\Components\TextInput::make('total_price')
                    ->disabled(),

                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'diproses' => 'Diproses',
                        'selesai' => 'Selesai',
                        'dibatalkan' => 'Dibatalkan',
                    ])
                    ->default('pending')
                    ->required(),

                Forms\Components\Select::make('payment_method')
                    ->options([
                        'cash' => 'Cash',
                        'qris' => 'QRIS',
                    ]),

                Forms\Components\Select::make('payment_status')
                    ->options([
                        'belum_bayar' => 'Belum Bayar',
                        'lunas' => 'Lunas',
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->headerActions([
                Tables\Actions\Action::make('exportPdf')
                    ->label('Export PDF')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->url(route('report.sales'))
                    ->openUrlInNewTab(),
            ])

            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('No. Order')
                    ->sortable(),

                Tables\Columns\TextColumn::make('customer_name')
                    ->label('Nama Pelanggan')
                    ->searchable(),

                Tables\Columns\TextColumn::make('phone')
                    ->label('No. WhatsApp'),

                Tables\Columns\TextColumn::make('items_summary')
                    ->label('Detail Menu')
                    ->getStateUsing(function ($record) {
                        return $record->orderItems->map(function ($item) {
                            return ($item->product->name ?? 'Produk') . ' (x' . $item->quantity . ')';
                        })->implode(', ');
                    })
                    ->wrap(),

                Tables\Columns\TextColumn::make('total_price')
                    ->label('Total Harga')
                    ->money('IDR')
                    ->sortable(),

                Tables\Columns\SelectColumn::make('status')
                    ->label('Status Pesanan')
                    ->options([
                        'pending' => 'Pending',
                        'diproses' => 'Diproses',
                        'selesai' => 'Selesai',
                        'dibatalkan' => 'Dibatalkan',
                    ])
                    ->selectablePlaceholder(false),

                Tables\Columns\TextColumn::make('payment_method')
                    ->label('Pembayaran')
                    ->badge(),

                Tables\Columns\SelectColumn::make('payment_status')
                    ->label('Status Pembayar')
                    ->options([
                        'belum_bayar' => 'Belum Bayar',
                        'lunas' => 'Lunas',
                    ])
                    ->selectablePlaceholder(false),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Order')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])

            ->actions([
                Tables\Actions\Action::make('proses')
                    ->label('Proses')
                    ->color('info')
                    ->icon('heroicon-o-arrow-path')
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->action(function ($record) {
                        $record->update(['status' => 'diproses']);
                    }),

                Tables\Actions\Action::make('selesai')
                    ->label('Selesai')
                    ->color('success')
                    ->icon('heroicon-o-check-circle')
                    ->visible(fn ($record) => $record->status === 'diproses')
                    ->action(function ($record) {
                        $record->update([
                            'status' => 'selesai',
                            'payment_status' => 'lunas',
                        ]);
                    }),

                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\OrderItemsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
