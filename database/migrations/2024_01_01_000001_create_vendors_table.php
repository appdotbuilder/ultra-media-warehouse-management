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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company');
            $table->string('email')->unique();
            $table->string('phone');
            $table->text('address');
            $table->string('contact_person');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->decimal('rating', 2, 1)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('name');
            $table->index('company');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};