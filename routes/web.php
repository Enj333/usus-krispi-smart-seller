<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReportController;

Route::post('/checkout', [OrderController::class, 'store'])
    ->name('checkout.store');

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::post('/cart/add/{id}', [CartController::class, 'add'])
    ->name('cart.add');

Route::post('/cart/decrease/{id}', [CartController::class, 'decrease']);

Route::delete('/cart/remove/{id}', [CartController::class, 'remove']);

Route::get(
    '/report/sales-pdf',
    [ReportController::class, 'salesPdf']
)->name('report.sales');
