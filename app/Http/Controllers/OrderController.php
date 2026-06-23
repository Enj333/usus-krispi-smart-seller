<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required',
            'phone' => 'required',
            'payment_method' => 'required',
        ]);

        $cart = Session::get('cart', []);

        if (empty($cart)) {
            return back();
        }

        $total = collect($cart)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });

        foreach ($cart as $item) {

            $product = Product::find($item['id']);

            if (!$product || $product->stock < $item['quantity']) {
                return back()->with(
                    'error',
                    $product ? $product->name . ' stok tidak cukup!' : 'Produk tidak ditemukan'
                );
            }
        }

        DB::beginTransaction();
        try {
            $order = Order::create([
                'customer_name' => $request->customer_name,
                'phone' => $request->phone,
                'total_price' => $total,
                'status' => 'pending',

                'payment_method' => $request->payment_method,

                'payment_status' =>
                $request->payment_method == 'cash'
                    ? 'lunas'
                    : 'belum_bayar',
            ]);

            foreach ($cart as $item) {

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['price'] * $item['quantity'],
                ]);

                Product::where('id', $item['id'])
                    ->decrement('stock', $item['quantity']);
            }

            DB::commit();

            $message = "🔔 ORDER BARU\n\n";

            $message .= "👤 Nama: {$order->customer_name}\n";
            $message .= "📱 No HP: {$order->phone}\n\n";

            foreach ($cart as $item) {

                $message .= "• {$item['name']} x{$item['quantity']}\n";
            }

            $message .= "\n💰 Total: Rp " . number_format($total, 0, ',', '.');

            Http::post(
                "https://api.telegram.org/bot" .
                    config('services.telegram.token') .
                    "/sendMessage",
                [
                    'chat_id' => config('services.telegram.chat_id'),
                    'text' => $message,
                ]
            );
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        Session::forget('cart');

        return redirect()->route('order.success', ['order' => $order->id])
            ->with('success', 'Pesanan berhasil dibuat');
    }

    public function success(Order $order)
    {
        $order->load('orderItems.product');
        return \Inertia\Inertia::render('OrderSuccess', [
            'order' => $order,
        ]);
    }

    public function simulatePayment(Order $order)
    {
        if ($order->payment_status !== 'lunas') {
            $order->update([
                'payment_status' => 'lunas',
            ]);

            $message = "💳 SIMULASI BAYAR QRIS LUNAS\n\n";
            $message .= "👤 Nama: {$order->customer_name}\n";
            $message .= "📱 No HP: {$order->phone}\n";
            $message .= "💰 Total: Rp " . number_format($order->total_price, 0, ',', '.') . "\n";
            $message .= "✅ Status Pembayaran: LUNAS via QRIS";

            try {
                Http::post(
                    "https://api.telegram.org/bot" .
                        config('services.telegram.token') .
                        "/sendMessage",
                    [
                        'chat_id' => config('services.telegram.chat_id'),
                        'text' => $message,
                    ]
                );
            } catch (\Exception $e) {
                // Ignore telegram errors
            }
        }

        return redirect()->back()->with('success', 'Simulasi pembayaran QRIS berhasil!');
    }
}
