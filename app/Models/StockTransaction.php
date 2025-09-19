<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StockTransaction
 *
 * @property int $id
 * @property string $transaction_code
 * @property int $item_id
 * @property int $user_id
 * @property string $type
 * @property int $quantity
 * @property float $unit_price
 * @property float $total_amount
 * @property int $stock_before
 * @property int $stock_after
 * @property string|null $notes
 * @property string|null $document_reference
 * @property \Illuminate\Support\Carbon $transaction_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Item $item
 * @property-read \App\Models\User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereDocumentReference($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereStockAfter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereStockBefore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereTransactionCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereTransactionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction stockIn()
 * @method static \Illuminate\Database\Eloquent\Builder|StockTransaction stockOut()
 * @method static \Database\Factories\StockTransactionFactory factory($count = null, $state = [])
 *
 * @mixin \Eloquent
 */
class StockTransaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'transaction_code',
        'item_id',
        'user_id',
        'type',
        'quantity',
        'unit_price',
        'total_amount',
        'stock_before',
        'stock_after',
        'notes',
        'document_reference',
        'transaction_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'stock_before' => 'integer',
        'stock_after' => 'integer',
        'transaction_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the item that owns the transaction.
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * Get the user who processed the transaction.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include stock in transactions.
     */
    public function scopeStockIn($query)
    {
        return $query->where('type', 'in');
    }

    /**
     * Scope a query to only include stock out transactions.
     */
    public function scopeStockOut($query)
    {
        return $query->where('type', 'out');
    }
}