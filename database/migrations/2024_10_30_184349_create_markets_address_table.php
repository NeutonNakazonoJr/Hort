<?php

use App\Models\Market;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('markets_address', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Market::class);
            $table->string('city', 100);
            $table->string('street', 100);
            $table->string('district', 100);
            $table->char('zip_code', 9);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('markets_address');
    }
};
