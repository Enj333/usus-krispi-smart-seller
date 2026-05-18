<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'subtotal',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected static function booted()
    {
        static::saved(function ($orderItem) {

            $total = $orderItem->order
                ->orderItems
                ->sum('subtotal');

            $orderItem->order->update([
                'total_price' => $total,
            ]);
        });

        static::deleted(function ($orderItem) {

            $total = $orderItem->order
                ->orderItems
                ->sum('subtotal');

            $orderItem->order->update([
                'total_price' => $total,
            ]);
        });
    }
}
