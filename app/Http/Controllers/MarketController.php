<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMarketRequest;
use App\Models\Market;
use App\Models\MarketAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MarketController extends Controller
{
    public function index(Request $request)
    {
    }

    public function create(Request $request)
    {
        return Inertia::render('Market/Index');
    }

    public function store(StoreMarketRequest $request)
    {
        DB::transaction(function () use ($request) {
            
            $newMarket = Market::create([
                'name' => $request->name,
                'nickname' => $request->nickname
            ]);

            MarketAddress::create([
                'market_id' => $newMarket->id,
                'city' => $request->city,
                'street' => $request->street,
                'district' => $request->district,
                'zip_code' => $request->zip_code
            ]);

            return redirect()->back();
        });
    }
}
