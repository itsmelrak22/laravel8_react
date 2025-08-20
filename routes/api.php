<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Models\Role;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/roles', function () {
    return Role::withCount('users')->get();
});

Route::post('/roles', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255|unique:roles',
        'description' => 'nullable|string|max:500'
    ]);

    $role = Role::create([
        'name' => $request->name,
        'description' => $request->description
    ]);

    return response()->json($role, 201);
});

Route::delete('/roles/{role}', function (Role $role) {
    if ($role->users()->count() > 0) {
        return response()->json(['message' => 'Cannot delete role that has users assigned'], 400);
    }
    
    $role->delete();
    return response()->json(['message' => 'Role deleted successfully']);
});

Route::get('/users', function () {
    return Role::with('users')->get();
});

Route::post('/users', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'roles' => 'required|array',
        'roles.*' => 'exists:roles,id'
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt('password') // Default password
    ]);

    $user->roles()->attach($request->roles);

    return response()->json($user->load('roles'), 201);
});