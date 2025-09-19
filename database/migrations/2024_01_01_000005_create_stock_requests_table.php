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
        Schema::create('stock_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_code', 30)->unique();
            $table->foreignId('item_id')->constrained();
            $table->foreignId('requested_by')->constrained('users');
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->integer('requested_quantity');
            $table->integer('approved_quantity')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected', 'fulfilled'])->default('pending');
            $table->text('request_reason');
            $table->text('approval_notes')->nullable();
            $table->datetime('request_date');
            $table->datetime('approval_date')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('request_code');
            $table->index('item_id');
            $table->index('requested_by');
            $table->index('status');
            $table->index('request_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_requests');
    }
};