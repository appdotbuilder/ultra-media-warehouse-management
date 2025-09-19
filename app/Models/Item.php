<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Item
 *
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string|null $description
 * @property int $category_id
 * @property int $vendor_id
 * @property string $type
 * @property float $purchase_price
 * @property float $selling_price
 * @property int $current_stock
 * @property int $minimum_stock
 * @property string $unit
 * @property string|null $location
 * @property string|null $barcode
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\Vendor $vendor
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StockTransaction> $stockTransactions
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StockRequest> $stockRequests
 * @property-read bool $is_low_stock
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Item newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Item newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Item query()
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereBarcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereCurrentStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereMinimumStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item wherePurchasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereSellingPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereVendorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item active()
 * @method static \Illuminate\Database\Eloquent\Builder|Item lowStock()
 * @method static \Database\Factories\ItemFactory factory($count = null, $state = [])
 *
 * @mixin \Eloquent
 */
class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'name',
        'description',
        'category_id',
        'vendor_id',
        'type',
        'purchase_price',
        'selling_price',
        'current_stock',
        'minimum_stock',
        'unit',
        'location',
        'barcode',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'current_stock' => 'integer',
        'minimum_stock' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the category that owns the item.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the vendor that owns the item.
     */
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    /**
     * Get the stock transactions for the item.
     */
    public function stockTransactions(): HasMany
    {
        return $this->hasMany(StockTransaction::class);
    }

    /**
     * Get the stock requests for the item.
     */
    public function stockRequests(): HasMany
    {
        return $this->hasMany(StockRequest::class);
    }

    /**
     * Check if item stock is low.
     *
     * @return bool
     */
    public function getIsLowStockAttribute(): bool
    {
        return $this->current_stock <= $this->minimum_stock;
    }

    /**
     * Scope a query to only include active items.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include items with low stock.
     */
    public function scopeLowStock($query)
    {
        return $query->whereColumn('current_stock', '<=', 'minimum_stock');
    }
}