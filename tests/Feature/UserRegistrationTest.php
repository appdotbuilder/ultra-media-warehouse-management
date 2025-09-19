<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('registration page loads correctly', function () {
    $response = $this->get('/register');
    $response->assertStatus(200);
});

test('user can register successfully', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertRedirect('/dashboard');
    
    $this->assertDatabaseHas('users', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'role' => 'user_biasa',
        'status' => 'active',
    ]);

    $user = User::where('email', 'test@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user->role)->toBe('user_biasa');
    expect($user->status)->toBe('active');
});

test('registration validation errors', function () {
    // Test missing required fields
    $response = $this->post('/register', []);
    $response->assertSessionHasErrors(['name', 'email', 'password']);

    // Test invalid email
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'invalid-email',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);
    $response->assertSessionHasErrors(['email']);

    // Test password confirmation mismatch
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'password_confirmation' => 'different_password',
    ]);
    $response->assertSessionHasErrors(['password']);
});

test('duplicate email registration fails', function () {
    // Create a user
    User::factory()->create([
        'email' => 'existing@example.com'
    ]);

    // Try to register with the same email
    $response = $this->post('/register', [
        'name' => 'Another User',
        'email' => 'existing@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('admin account exists after seeding', function () {
    // Run the seeder
    $this->seed();

    // Check that admin account exists
    $admin = User::where('email', 'admin@ultramedtek.com')->first();
    
    expect($admin)->not->toBeNull();
    expect($admin->name)->toBe('Administrator');
    expect($admin->role)->toBe('admin');
    expect($admin->status)->toBe('active');
    expect($admin->email_verified_at)->not->toBeNull();
});

test('admin account can login', function () {
    // Run the seeder to create admin account
    $this->seed();

    $response = $this->post('/login', [
        'email' => 'admin@ultramedtek.com',
        'password' => 'password',
    ]);

    $response->assertRedirect('/dashboard');
    
    $admin = User::where('email', 'admin@ultramedtek.com')->first();
    $this->assertAuthenticatedAs($admin);
});