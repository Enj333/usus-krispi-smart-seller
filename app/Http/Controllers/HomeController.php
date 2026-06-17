<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'products' => Product::all(),
            'cart' => Session::get('cart', [])
        ]);
    }
}