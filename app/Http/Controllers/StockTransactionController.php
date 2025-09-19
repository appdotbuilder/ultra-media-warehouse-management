<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStockTransactionRequest;
use App\Models\StockTransaction;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StockTransactionController extends Controller
{
    /**
     * Display a listing of stock transactions.
     */
    public function index(Request $request)
    {
        $query = StockTransaction::with(['item', 'user']);

        // Apply filters
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('transaction_code', 'like', '%' . $request->search . '%')
                  ->orWhereHas('item', function ($itemQuery) use ($request) {
                      $itemQuery->where('name', 'like', '%' . $request->search . '%');
                  });
            });
        }

        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('item_id') && $request->item_id) {
            $query->where('item_id', $request->item_id);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('transaction_date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('transaction_date', '<=', $request->date_to);
        }

        $transactions = $query->latest('transaction_date')->paginate(15);
        
        $items = Item::active()->orderBy('name')->get();

        return Inertia::render('stock-transactions/index', [
            'transactions' => $transactions,
            'items' => $items,
            'filters' => $request->only(['search', 'type', 'item_id', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Show the form for creating a new stock transaction.
     */
    public function create()
    {
        $items = Item::active()->with(['category', 'vendor'])->orderBy('name')->get();

        return Inertia::render('stock-transactions/create', [
            'items' => $items,
        ]);
    }

    /**
     * Store a newly created stock transaction.
     */
    public function store(StoreStockTransactionRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $validatedData = $request->validated();
                $item = Item::findOrFail($validatedData['item_id']);
                
                // Generate transaction code
                $prefix = $validatedData['type'] === 'in' ? 'IN' : 'OUT';
                $count = StockTransaction::where('type', $validatedData['type'])->count() + 1;
                $validatedData['transaction_code'] = sprintf('%s-%04d-%03d', $prefix, date('y'), $count);
                
                // Set stock before and after
                $validatedData['stock_before'] = $item->current_stock;
                
                if ($validatedData['type'] === 'in') {
                    $validatedData['stock_after'] = $item->current_stock + $validatedData['quantity'];
                } else {
                    if ($item->current_stock < $validatedData['quantity']) {
                        throw new \Exception('Stok tidak mencukupi untuk transaksi keluar.');
                    }
                    $validatedData['stock_after'] = $item->current_stock - $validatedData['quantity'];
                }
                
                // Calculate total amount
                $validatedData['total_amount'] = $validatedData['quantity'] * $validatedData['unit_price'];
                
                // Set user
                $validatedData['user_id'] = auth()->id();
                
                // Create transaction
                $transaction = StockTransaction::create($validatedData);
                
                // Update item stock
                $item->update(['current_stock' => $validatedData['stock_after']]);
            });

            return redirect()->route('stock-transactions.index')
                ->with('success', 'Transaksi stok berhasil dicatat.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified stock transaction.
     */
    public function show(StockTransaction $stockTransaction)
    {
        $stockTransaction->load(['item.category', 'item.vendor', 'user']);

        return Inertia::render('stock-transactions/show', [
            'transaction' => $stockTransaction,
        ]);
    }

    /**
     * Remove the specified stock transaction from storage.
     */
    public function destroy(StockTransaction $stockTransaction)
    {
        try {
            DB::transaction(function () use ($stockTransaction) {
                $item = $stockTransaction->item;
                
                // Reverse the stock change
                if ($stockTransaction->type === 'in') {
                    $newStock = $item->current_stock - $stockTransaction->quantity;
                } else {
                    $newStock = $item->current_stock + $stockTransaction->quantity;
                }
                
                if ($newStock < 0) {
                    throw new \Exception('Tidak dapat menghapus transaksi karena akan menyebabkan stok negatif.');
                }
                
                // Update item stock
                $item->update(['current_stock' => $newStock]);
                
                // Delete transaction
                $stockTransaction->delete();
            });

            return redirect()->route('stock-transactions.index')
                ->with('success', 'Transaksi stok berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }
}