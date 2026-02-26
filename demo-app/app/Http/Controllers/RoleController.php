<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/roles/index', [
            'roles' => Role::withCount('users')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/roles/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:app_roles',
            'display_name' => 'required',
            'permissions' => 'array',
        ]);

        Role::create($request->all());
        return redirect()->route('admin.roles.index');
    }

    public function edit(Role $role)
    {
        return Inertia::render('admin/roles/edit', [
            'role' => $role,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|unique:app_roles,name,' . $role->id,
            'display_name' => 'required',
            'permissions' => 'array',
        ]);

        $role->update($request->all());
        return redirect()->route('admin.roles.index');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('admin.roles.index');
    }
}