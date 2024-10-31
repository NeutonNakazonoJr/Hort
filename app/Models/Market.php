<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Market extends Model
{
    /** @use HasFactory<\Database\Factories\MarketFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'nickname'
    ];

    /**
     * Get the marketAddress associated with the Market
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function marketAddress(): HasOne
    {
        return $this->hasOne(MarketAddress::class);
    }
}
