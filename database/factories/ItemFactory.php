<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $purchasePrice = fake()->randomFloat(2, 10, 10000);
        $sellingPrice = $purchasePrice * fake()->randomFloat(2, 1.2, 2.5);
        $currentStock = fake()->numberBetween(0, 1000);
        $minimumStock = fake()->numberBetween(10, 50);

        return [
            'code' => strtoupper(fake()->bothify('ITM-####-???')),
            'name' => fake()->words(3, true),
            'description' => fake()->optional()->paragraph(),
            'category_id' => Category::factory(),
            'vendor_id' => Vendor::factory(),
            'type' => fake()->randomElement(['consumable', 'asset', 'spare_part']),
            'purchase_price' => $purchasePrice,
            'selling_price' => $sellingPrice,
            'current_stock' => $currentStock,
            'minimum_stock' => $minimumStock,
            'unit' => fake()->randomElement(['pcs', 'kg', 'liter', 'meter', 'box', 'set']),
            'location' => fake()->optional()->bothify('Rack-##-?'),
            'barcode' => fake()->optional()->ean13(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the item is low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_stock' => fake()->numberBetween(0, 5),
            'minimum_stock' => fake()->numberBetween(10, 20),
        ]);
    }

    /**
     * Indicate that the item is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}