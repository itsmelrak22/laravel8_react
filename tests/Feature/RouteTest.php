<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RouteTest extends TestCase
{
    use RefreshDatabase;

    public function test_roles_route_exists()
    {
        $response = $this->get('/api/roles');
        
        $this->assertNotEquals(404, $response->status());
    }

    public function test_users_route_exists()
    {
        $response = $this->get('/api/users');
        
        $this->assertNotEquals(404, $response->status());
    }
}
