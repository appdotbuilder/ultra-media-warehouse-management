<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use App\Models\Category;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of items.
     */
    public function index(Request $request)
    {
        $query = Item::with(['category', 'vendor']);

        // Apply filters
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('vendor_id') && $request->vendor_id) {
            $query->where('vendor_id', $request->vendor_id);
        }

        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        if ($request->has('low_stock') && $request->low_stock) {
            $query->lowStock();
        }

        $items = $query->latest()->paginate(15);
        
        $categories = Category::active()->orderBy('name')->get();
        $vendors = Vendor::active()->orderBy('name')->get();

        return Inertia::render('items/index', [
            'items' => $items,
            'categories' => $categories,
            'vendors' => $vendors,
            'filters' => $request->only(['search', 'category_id', 'vendor_id', 'type', 'status', 'low_stock']),
        ]);
    }

    /**
     * Show the form for creating a new item.
     */
    public function create()
    {
        $categories = Category::active()->orderBy('name')->get();
        $vendors = Vendor::active()->orderBy('name')->get();

        return Inertia::render('items/create', [
            'categories' => $categories,
            'vendors' => $vendors,
        ]);
    }

    /**
     * Store a newly created item in storage.
     */
    public function store(StoreItemRequest $request)
    {
        $item = Item::create($request->validated());

        return redirect()->route('items.show', $item)
            ->with('success', 'Item berhasil ditambahkan.');
    }

    /**
     * Display the specified item.
     */
    public function show(Item $item)
    {
        $item->load(['category', 'vendor', 'stockTransactions.user']);
        
        $recentTransactions = $item->stockTransactions()
            ->with('user')
            ->latest('transaction_date')
            ->take(10)
            ->get();

        return Inertia::render('items/show', [
            'item' => $item,
            'recent_transactions' => $recentTransactions,
        ]);
    }

    /**
     * Show the form for editing the specified item.
     */
    public function edit(Item $item)
    {
        $categories = Category::active()->orderBy('name')->get();
        $vendors = Vendor::active()->orderBy('name')->get();

        return Inertia::render('items/edit', [
            'item' => $item,
            'categories' => $categories,
            'vendors' => $vendors,
        ]);
    }

    /**
     * Update the specified item in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $item->update($request->validated());

        return redirect()->route('items.show', $item)
            ->with('success', 'Item berhasil diperbarui.');
    }

    /**
     * Remove the specified item from storage.
     */
    public function destroy(Item $item)
    {
        // Check if item has transactions
        if ($item->stockTransactions()->exists()) {
            return redirect()->route('items.index')
                ->with('error', 'Item tidak dapat dihapus karena memiliki riwayat transaksi.');
        }

        $item->delete();

        return redirect()->route('items.index')
            ->with('success', 'Item berhasil dihapus.');
    }
}