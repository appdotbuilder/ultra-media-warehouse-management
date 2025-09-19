<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Electronics' => 'ELEC',
            'Office Supplies' => 'OFFC',
            'Furniture' => 'FURN',
            'Tools' => 'TOOL',
            'Safety Equipment' => 'SAFE',
            'Computer Hardware' => 'COMP',
            'Network Equipment' => 'NETW',
            'Medical Supplies' => 'MEDI',
            'Cleaning Supplies' => 'CLEA',
            'Raw Materials' => 'RAWM',
        ];

        $category = fake()->randomElement(array_keys($categories));
        
        return [
            'name' => $category,
            'code' => $categories[$category],
            'description' => fake()->optional()->paragraph(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the category is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}