<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockTransaction>
 */
class StockTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['in', 'out']);
        $quantity = fake()->numberBetween(1, 100);
        $unitPrice = fake()->randomFloat(2, 10, 1000);
        $stockBefore = fake()->numberBetween(50, 500);
        $stockAfter = $type === 'in' ? $stockBefore + $quantity : $stockBefore - $quantity;

        return [
            'transaction_code' => strtoupper(fake()->bothify($type === 'in' ? 'IN-####-###' : 'OUT-####-###')),
            'item_id' => Item::factory(),
            'user_id' => User::factory(),
            'type' => $type,
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'total_amount' => $quantity * $unitPrice,
            'stock_before' => $stockBefore,
            'stock_after' => max(0, $stockAfter),
            'notes' => fake()->optional()->sentence(),
            'document_reference' => fake()->optional()->bothify('DOC-####'),
            'transaction_date' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the transaction is stock in.
     */
    public function stockIn(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'in',
            'transaction_code' => strtoupper(fake()->bothify('IN-####-###')),
        ]);
    }

    /**
     * Indicate that the transaction is stock out.
     */
    public function stockOut(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'out',
            'transaction_code' => strtoupper(fake()->bothify('OUT-####-###')),
        ]);
    }
}