<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller
{
    public function index()
    {
        // Get product ID with the highest total quantity sold from completed orders
        $bestSellerId = \App\Models\OrderItem::join('orders', 'orders.id', '=', 'order_items.order_id')
            ->where('orders.status', 'selesai')
            ->groupBy('order_items.product_id')
            ->orderByRaw('SUM(order_items.quantity) DESC')
            ->value('order_items.product_id');

        $bestSeller = $bestSellerId ? Product::find($bestSellerId) : null;

        // Fallback to highest priced product if no sales yet
        if (!$bestSeller) {
            $bestSeller = Product::orderBy('price', 'desc')->first();
        }

        // Get unique variants to use as dynamic categories
        $variants = Product::whereNotNull('variant')
            ->where('variant', '!=', '')
            ->distinct()
            ->pluck('variant');

        return Inertia::render('Welcome', [
            'products' => Product::all(),
            'bestSeller' => $bestSeller,
            'variants' => $variants,
            'cart' => Session::get('cart', [])
        ]);
    }
}