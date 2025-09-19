<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\StockTransaction;
use App\Models\StockRequest;
use App\Models\Vendor;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display the warehouse dashboard.
     */
    public function index()
    {
        // Summary statistics
        $totalItems = Item::active()->count();
        $totalVendors = Vendor::active()->count();
        $totalCategories = Category::active()->count();
        $lowStockItems = Item::active()->lowStock()->count();
        
        // Recent transactions
        $recentTransactions = StockTransaction::with(['item', 'user'])
            ->latest('transaction_date')
            ->take(10)
            ->get();

        // Pending requests
        $pendingRequests = StockRequest::with(['item', 'requestedBy'])
            ->pending()
            ->latest('request_date')
            ->take(10)
            ->get();

        // Low stock items detail
        $lowStockItemsDetail = Item::with(['category', 'vendor'])
            ->active()
            ->lowStock()
            ->orderBy('current_stock', 'asc')
            ->take(10)
            ->get();

        // Transaction trends (last 7 days) - SQLite compatible
        $transactionTrends = StockTransaction::select(
                DB::raw('date(transaction_date) as date'),
                DB::raw('SUM(CASE WHEN type = "in" THEN quantity ELSE 0 END) as stock_in'),
                DB::raw('SUM(CASE WHEN type = "out" THEN quantity ELSE 0 END) as stock_out')
            )
            ->where('transaction_date', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top categories by transaction value
        $topCategories = Category::select('categories.name')
            ->join('items', 'categories.id', '=', 'items.category_id')
            ->join('stock_transactions', 'items.id', '=', 'stock_transactions.item_id')
            ->selectRaw('categories.name, SUM(stock_transactions.total_amount) as total_value')
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('total_value')
            ->take(5)
            ->get();

        // Monthly transaction summary - SQLite compatible
        $monthlyTransactions = StockTransaction::select(
                DB::raw('strftime("%m", transaction_date) as month'),
                DB::raw('strftime("%Y", transaction_date) as year'),
                DB::raw('SUM(CASE WHEN type = "in" THEN total_amount ELSE 0 END) as total_in'),
                DB::raw('SUM(CASE WHEN type = "out" THEN total_amount ELSE 0 END) as total_out'),
                DB::raw('COUNT(*) as transaction_count')
            )
            ->where('transaction_date', '>=', now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return Inertia::render('dashboard', [
            'statistics' => [
                'total_items' => $totalItems,
                'total_vendors' => $totalVendors,
                'total_categories' => $totalCategories,
                'low_stock_items' => $lowStockItems,
            ],
            'recent_transactions' => $recentTransactions,
            'pending_requests' => $pendingRequests,
            'low_stock_items_detail' => $lowStockItemsDetail,
            'transaction_trends' => $transactionTrends,
            'top_categories' => $topCategories,
            'monthly_transactions' => $monthlyTransactions,
        ]);
    }
}