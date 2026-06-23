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

Route::get('/order/{order}/success', [OrderController::class, 'success'])->name('order.success');
Route::post('/order/{order}/simulate-payment', [OrderController::class, 'simulatePayment'])->name('order.simulate-payment');

Route::get(
    '/report/sales-pdf',
    [ReportController::class, 'salesPdf']
)->name('report.sales');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
