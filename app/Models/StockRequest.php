<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StockRequest
 *
 * @property int $id
 * @property string $request_code
 * @property int $item_id
 * @property int $requested_by
 * @property int|null $approved_by
 * @property int $requested_quantity
 * @property int|null $approved_quantity
 * @property string $status
 * @property string $request_reason
 * @property string|null $approval_notes
 * @property \Illuminate\Support\Carbon $request_date
 * @property \Illuminate\Support\Carbon|null $approval_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Item $item
 * @property-read \App\Models\User $requestedBy
 * @property-read \App\Models\User|null $approvedBy
 *
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereApprovalDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereApprovalNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereApprovedQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereRequestCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereRequestDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereRequestReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereRequestedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereRequestedQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|StockRequest approved()
 * @method static \Database\Factories\StockRequestFactory factory($count = null, $state = [])
 *
 * @mixin \Eloquent
 */
class StockRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'request_code',
        'item_id',
        'requested_by',
        'approved_by',
        'requested_quantity',
        'approved_quantity',
        'status',
        'request_reason',
        'approval_notes',
        'request_date',
        'approval_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'requested_quantity' => 'integer',
        'approved_quantity' => 'integer',
        'request_date' => 'datetime',
        'approval_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the item that was requested.
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * Get the user who made the request.
     */
    public function requestedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    /**
     * Get the user who approved the request.
     */
    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Scope a query to only include pending requests.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved requests.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}