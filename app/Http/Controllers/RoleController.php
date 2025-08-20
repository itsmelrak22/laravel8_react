<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{

    public function index()
    {
        try {
            $roles = Role::withCount('users')->get();
            return response()->json($roles);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'description' => 'nullable|string|max:500'
        ]);

        try {
            $role = Role::create([
                'name' => $request->name,
                'description' => $request->description
            ]);

            return response()->json($role, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function destroy(Role $role)
    {
        try {
            if ($role->users()->count() > 0) {
                return response()->json([
                    'message' => 'Cannot delete role that has users assigned'
                ], 400);
            }
            
            $role->delete();
            return response()->json(['message' => 'Role deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
