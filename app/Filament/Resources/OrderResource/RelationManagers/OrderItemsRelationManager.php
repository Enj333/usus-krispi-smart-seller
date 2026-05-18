<?php

namespace App\Filament\Resources\OrderResource\RelationManagers;

use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'orderItems';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('product_id')
                    ->relationship('product', 'name')
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set) {

                        $product = Product::find($state);

                        if ($product) {
                            $set('price', $product->price);
                        }
                    }),

                Forms\Components\TextInput::make('quantity')
                    ->numeric()
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $get, callable $set) {

                        $price = $get('price');

                        $set('subtotal', $state * $price);
                    }),

                Forms\Components\TextInput::make('price')
                    ->numeric()
                    ->disabled()
                    ->required()
                    ->dehydrated(),

                Forms\Components\TextInput::make('subtotal')
                    ->numeric()
                    ->disabled()
                    ->required()
                    ->dehydrated(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('product.name')
                    ->label('Product'),

                Tables\Columns\TextColumn::make('quantity'),

                Tables\Columns\TextColumn::make('price')
                    ->money('IDR'),

                Tables\Columns\TextColumn::make('subtotal')
                    ->money('IDR'),
            ])

            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->after(function ($record) {

                        $total = \App\Models\OrderItem::where('order_id', $record->order_id)
                            ->sum('subtotal');

                        \App\Models\Order::where('id', $record->order_id)
                            ->update([
                                'total_price' => $total,
                            ]);
                    }),
            ])

            ->actions([
                Tables\Actions\EditAction::make()
                    ->after(function ($record) {

                        $total = \App\Models\OrderItem::where('order_id', $record->order_id)
                            ->sum('subtotal');

                        \App\Models\Order::where('id', $record->order_id)
                            ->update([
                                'total_price' => $total,
                            ]);
                    }),

                Tables\Actions\DeleteAction::make()
                    ->after(function ($record) {

                        $total = \App\Models\OrderItem::where('order_id', $record->order_id)
                            ->sum('subtotal');

                        \App\Models\Order::where('id', $record->order_id)
                            ->update([
                                'total_price' => $total,
                            ]);
                    }),
            ]);
    }
}
