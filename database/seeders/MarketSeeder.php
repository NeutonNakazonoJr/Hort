<?php

namespace Database\Seeders;

use App\Models\Market;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        Market::insert([
            ['name' => 'Paraíso Loja 14', 'nickname' => 'Par1', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Paraíso Loja 11', 'nickname' => 'Par2', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Paraíso Loja 8', 'nickname' => 'Par3', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Paraíso Loja 11', 'nickname' => 'Par4', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Paraíso Loja 17', 'nickname' => 'Par5', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Paraíso Loja 10', 'nickname' => 'Par6', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Paraíso Loja novo', 'nickname' => 'Par7', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Paraíso Loja novo cidade alta', 'nickname' => 'Par8', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
