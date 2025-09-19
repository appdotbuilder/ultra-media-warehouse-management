<?php

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
        Schema::create('stock_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code', 30)->unique();
            $table->foreignId('item_id')->constrained();
            $table->foreignId('user_id')->constrained(); // Who processed the transaction
            $table->enum('type', ['in', 'out']); // in = barang masuk, out = barang keluar
            $table->integer('quantity');
            $table->decimal('unit_price', 15, 2);
            $table->decimal('total_amount', 15, 2);
            $table->integer('stock_before');
            $table->integer('stock_after');
            $table->text('notes')->nullable();
            $table->string('document_reference')->nullable(); // PO number, delivery order, etc
            $table->datetime('transaction_date');
            $table->timestamps();
            
            // Indexes
            $table->index('transaction_code');
            $table->index('item_id');
            $table->index('user_id');
            $table->index('type');
            $table->index('transaction_date');
            $table->index(['item_id', 'type', 'transaction_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_transactions');
    }
};