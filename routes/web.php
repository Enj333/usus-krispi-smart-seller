<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

Route::get('/', [HomeController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');
Route::post('/cart/add/{id}', [CartController::class, 'add'])
    ->name('cart.add');
Route::get('/cart', [CartController::class, 'index'])
    ->name('cart');
