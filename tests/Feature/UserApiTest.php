<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Role;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create roles for testing
        Role::create(['name' => 'Author']);
        Role::create(['name' => 'Editor']);
        Role::create(['name' => 'Subscriber']);
        Role::create(['name' => 'Administrator']);
        
        // Verify roles were created
        $this->assertEquals(4, Role::count(), 'Failed to create roles in test setup');
    }


    public function test_can_create_user_with_roles()
    {
        $roles = Role::take(2)->pluck('id')->toArray();

        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'roles' => $roles
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'id', 'name', 'email', 'created_at', 'updated_at',
                    'roles' => [
                        '*' => ['id', 'name', 'created_at', 'updated_at']
                    ]
                ]);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com'
        ]);
    }

    public function test_validates_required_fields()
    {
        $response = $this->postJson('/api/users', []);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'email', 'roles']);
    }

    public function test_validates_unique_email()
    {
        $user = User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->postJson('/api/users', [
            'name' => 'John Doe',
            'email' => 'existing@example.com',
            'roles' => [1]
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }

}
