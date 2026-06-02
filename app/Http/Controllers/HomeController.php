<?php

namespace App\Http\Controllers;

use App\Models\Product;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::all();

        $cart = session()->get('cart', []);

        return view('home', compact('products', 'cart'));
    }
}
