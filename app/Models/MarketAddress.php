<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarketAddress extends Model
{
    protected $fillable = [
        'market_id',
        'city',
        'street',
        'district',
        'zip_code'
    ];

    /**
     * Get the market that owns the MarketAddress
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function market(): BelongsTo
    {
        return $this->belongsTo(Market::class);
    }
}
