<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vendor;
use App\Models\Category;
use App\Models\Item;
use App\Models\StockTransaction;
use App\Models\StockRequest;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@ultramedtek.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create role-specific users
        $roles = [
            'staff_gudang' => 'Staff Gudang',
            'purchasing' => 'Purchasing Manager',
            'finance' => 'Finance Manager',
            'user_biasa' => 'Regular User',
        ];

        foreach ($roles as $role => $name) {
            User::create([
                'name' => $name,
                'email' => str_replace(' ', '.', strtolower($name)) . '@ultramedtek.com',
                'password' => Hash::make('password'),
                'role' => $role,
                'status' => 'active',
                'email_verified_at' => now(),
            ]);
        }

        // Create additional users
        User::factory(10)->create();

        // Create categories
        $categories = [
            ['name' => 'Electronics', 'code' => 'ELEC', 'description' => 'Electronic components and devices'],
            ['name' => 'Office Supplies', 'code' => 'OFFC', 'description' => 'Office and stationery supplies'],
            ['name' => 'Computer Hardware', 'code' => 'COMP', 'description' => 'Computer hardware and accessories'],
            ['name' => 'Network Equipment', 'code' => 'NETW', 'description' => 'Networking devices and cables'],
            ['name' => 'Safety Equipment', 'code' => 'SAFE', 'description' => 'Safety and protection equipment'],
            ['name' => 'Tools', 'code' => 'TOOL', 'description' => 'Hand tools and power tools'],
            ['name' => 'Raw Materials', 'code' => 'RAWM', 'description' => 'Raw materials for production'],
            ['name' => 'Spare Parts', 'code' => 'SPAR', 'description' => 'Machine and equipment spare parts'],
        ];

        foreach ($categories as $category) {
            Category::create(array_merge($category, ['status' => 'active']));
        }

        // Create vendors
        $vendors = [
            [
                'name' => 'PT Teknologi Maju',
                'company' => 'PT Teknologi Maju',
                'email' => 'vendor@teknologimaju.com',
                'phone' => '+62-21-12345678',
                'address' => 'Jl. Teknologi No. 123, Jakarta',
                'contact_person' => 'Budi Santoso',
                'status' => 'active',
                'rating' => 4.5,
            ],
            [
                'name' => 'CV Sumber Rejeki',
                'company' => 'CV Sumber Rejeki',
                'email' => 'info@sumberrejeki.com',
                'phone' => '+62-31-87654321',
                'address' => 'Jl. Industri No. 456, Surabaya',
                'contact_person' => 'Siti Aminah',
                'status' => 'active',
                'rating' => 4.2,
            ],
            [
                'name' => 'PT Elektronik Nusantara',
                'company' => 'PT Elektronik Nusantara',
                'email' => 'sales@elektronusantara.co.id',
                'phone' => '+62-22-11223344',
                'address' => 'Jl. Elektronik Raya No. 789, Bandung',
                'contact_person' => 'Ahmad Wijaya',
                'status' => 'active',
                'rating' => 4.8,
            ],
        ];

        foreach ($vendors as $vendor) {
            Vendor::create($vendor);
        }

        // Create additional vendors
        Vendor::factory(7)->active()->create();

        // Create items
        $categories = Category::all();
        $vendors = Vendor::all();

        foreach ($categories as $category) {
            Item::factory(random_int(8, 15))
                ->active()
                ->create([
                    'category_id' => $category->id,
                    'vendor_id' => $vendors->random()->id,
                ]);
        }

        // Create some low stock items
        Item::factory(10)
            ->active()
            ->lowStock()
            ->create([
                'category_id' => $categories->random()->id,
                'vendor_id' => $vendors->random()->id,
            ]);

        // Create stock transactions
        $users = User::where('role', '!=', 'user_biasa')->get();
        $items = Item::all();

        foreach ($items as $item) {
            // Create some stock in transactions
            $stockInCount = random_int(2, 8);
            for ($i = 0; $i < $stockInCount; $i++) {
                StockTransaction::factory()
                    ->stockIn()
                    ->create([
                        'item_id' => $item->id,
                        'user_id' => $users->random()->id,
                    ]);
            }

            // Create some stock out transactions
            $stockOutCount = random_int(1, 5);
            for ($i = 0; $i < $stockOutCount; $i++) {
                StockTransaction::factory()
                    ->stockOut()
                    ->create([
                        'item_id' => $item->id,
                        'user_id' => $users->random()->id,
                    ]);
            }
        }

        // Create stock requests
        $allUsers = User::all();
        $approvers = User::whereIn('role', ['admin', 'staff_gudang', 'purchasing'])->get();

        foreach ($items->take(30) as $item) {
            $requestCount = random_int(0, 3);
            for ($i = 0; $i < $requestCount; $i++) {
                StockRequest::factory()->create([
                    'item_id' => $item->id,
                    'requested_by' => $allUsers->random()->id,
                    'approved_by' => $approvers->random()->id,
                ]);
            }
        }

        // Create some pending requests
        StockRequest::factory(15)
            ->pending()
            ->create([
                'item_id' => $items->random()->id,
                'requested_by' => $allUsers->random()->id,
            ]);
    }
}