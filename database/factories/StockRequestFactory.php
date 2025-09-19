<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockRequest>
 */
class StockRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $requestedQuantity = fake()->numberBetween(1, 50);
        $status = fake()->randomElement(['pending', 'approved', 'rejected', 'fulfilled']);
        $approvedQuantity = $status === 'approved' || $status === 'fulfilled' ? 
            fake()->numberBetween(1, $requestedQuantity) : null;

        return [
            'request_code' => strtoupper(fake()->bothify('REQ-####-###')),
            'item_id' => Item::factory(),
            'requested_by' => User::factory(),
            'approved_by' => $status !== 'pending' ? User::factory() : null,
            'requested_quantity' => $requestedQuantity,
            'approved_quantity' => $approvedQuantity,
            'status' => $status,
            'request_reason' => fake()->sentence(),
            'approval_notes' => $status !== 'pending' ? fake()->optional()->sentence() : null,
            'request_date' => fake()->dateTimeBetween('-15 days', 'now'),
            'approval_date' => $status !== 'pending' ? fake()->dateTimeBetween('-10 days', 'now') : null,
        ];
    }

    /**
     * Indicate that the request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'approved_by' => null,
            'approved_quantity' => null,
            'approval_notes' => null,
            'approval_date' => null,
        ]);
    }

    /**
     * Indicate that the request is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_by' => User::factory(),
            'approved_quantity' => fake()->numberBetween(1, $attributes['requested_quantity']),
            'approval_notes' => fake()->sentence(),
            'approval_date' => fake()->dateTimeBetween('-5 days', 'now'),
        ]);
    }
}