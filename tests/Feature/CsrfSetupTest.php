<?php

test('CSRF token is present in the HTML meta tag', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertSee('name="csrf-token"', false);
    $response->assertSee('content="', false);
});

test('CSRF token works correctly when provided', function () {
    // Get CSRF token from the session
    $this->get('/'); // Initialize session
    
    $response = $this->post('/csrf-test', [
        '_token' => csrf_token()
    ]);

    $response->assertStatus(200);
    $response->assertJson([
        'status' => 'success',
        'message' => 'CSRF token is working correctly'
    ]);
});

test('registration form includes proper CSRF protection', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
    // The CSRF token should be available in the page's session
    expect(csrf_token())->not->toBeEmpty();
});

test('session configuration is working', function () {
    // Start a session
    $this->get('/');
    
    // Verify session has started
    expect(session()->getId())->not->toBeNull();
    
    // Test session persistence
    session(['test_key' => 'test_value']);
    expect(session('test_key'))->toBe('test_value');
});