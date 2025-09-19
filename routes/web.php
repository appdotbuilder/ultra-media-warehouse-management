<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\StockTransactionController;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::post('/csrf-test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'CSRF token is working correctly',
        'timestamp' => now()->toISOString(),
    ]);
})->name('csrf-test');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Warehouse Management Routes
    Route::resource('items', ItemController::class);
    Route::resource('stock-transactions', StockTransactionController::class)
        ->except(['edit', 'update']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
