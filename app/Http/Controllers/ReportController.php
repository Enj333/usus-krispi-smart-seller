<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function salesPdf()
    {
        $orders = Order::latest()->get();

        $totalOrder = $orders->count();
        $totalRevenue = $orders->sum('total_price');

        $pdf = Pdf::loadView('reports.sales', [
            'orders' => $orders,
            'totalOrder' => $totalOrder,
            'totalRevenue' => $totalRevenue,
        ]);

        return $pdf->download('laporan-penjualan.pdf');
    }
}