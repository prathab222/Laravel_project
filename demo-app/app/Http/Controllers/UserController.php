<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/users/index', [
            'users' => User::with('dynamicRole')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create', [
            'roles' => Role::where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'app_role_id' => 'nullable|exists:app_roles,id',
            'permissions' => 'array',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'app_role_id' => $request->app_role_id === 'none' ? null : $request->app_role_id,
            'permissions' => $request->permissions ?? [],
            'email_verified_at' => now(),
        ]);

        return redirect()->route('admin.users.index');
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user->load('dynamicRole'),
            'roles' => Role::where('is_active', true)->get(),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'app_role_id' => 'nullable|exists:app_roles,id',
            'permissions' => 'array',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'app_role_id' => $request->app_role_id === 'none' ? null : $request->app_role_id,
            'permissions' => $request->permissions ?? [],
        ];

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);
        return redirect()->route('admin.users.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users.index');
    }
}