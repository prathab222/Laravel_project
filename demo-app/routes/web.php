<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    $user = auth()->user();
    return Inertia::render('dashboard', [
        'isSuperAdmin' => $user->isSuperAdmin(),
        'userRole' => $user->role,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Permission-based Routes
Route::middleware(['auth', 'permission:users.view'])->group(function () {
    Route::get('/admin/users', [\App\Http\Controllers\UserController::class, 'index'])->name('admin.users.index');
});

Route::middleware(['auth', 'permission:users.create'])->group(function () {
    Route::get('/admin/users/create', [\App\Http\Controllers\UserController::class, 'create'])->name('admin.users.create');
    Route::post('/admin/users', [\App\Http\Controllers\UserController::class, 'store'])->name('admin.users.store');
});

Route::middleware(['auth', 'permission:users.edit'])->group(function () {
    Route::get('/admin/users/{user}/edit', [\App\Http\Controllers\UserController::class, 'edit'])->name('admin.users.edit');
    Route::put('/admin/users/{user}', [\App\Http\Controllers\UserController::class, 'update'])->name('admin.users.update');
});

Route::middleware(['auth', 'permission:users.delete'])->group(function () {
    Route::delete('/admin/users/{user}', [\App\Http\Controllers\UserController::class, 'destroy'])->name('admin.users.destroy');
});

Route::middleware(['auth', 'permission:roles.view'])->group(function () {
    Route::get('/admin/roles', [\App\Http\Controllers\RoleController::class, 'index'])->name('admin.roles.index');
});

Route::middleware(['auth', 'permission:roles.create'])->group(function () {
    Route::get('/admin/roles/create', [\App\Http\Controllers\RoleController::class, 'create'])->name('admin.roles.create');
    Route::post('/admin/roles', [\App\Http\Controllers\RoleController::class, 'store'])->name('admin.roles.store');
});

Route::middleware(['auth', 'permission:roles.edit'])->group(function () {
    Route::get('/admin/roles/{role}/edit', [\App\Http\Controllers\RoleController::class, 'edit'])->name('admin.roles.edit');
    Route::put('/admin/roles/{role}', [\App\Http\Controllers\RoleController::class, 'update'])->name('admin.roles.update');
});

Route::middleware(['auth', 'permission:roles.delete'])->group(function () {
    Route::delete('/admin/roles/{role}', [\App\Http\Controllers\RoleController::class, 'destroy'])->name('admin.roles.destroy');
});

// Healthcare Module Routes
Route::middleware(['auth', 'permission:doctors.view'])->group(function () {
    Route::get('/admin/doctors', function () {
        return Inertia::render('admin/doctors');
    })->name('admin.doctors');
});

Route::middleware(['auth', 'permission:patients.view'])->group(function () {
    Route::get('/admin/patients', function () {
        return Inertia::render('admin/patients');
    })->name('admin.patients');
});

Route::middleware(['auth', 'permission:questionnaires.view'])->group(function () {
    Route::get('/admin/questionnaires', function () {
        return Inertia::render('admin/questionnaires');
    })->name('admin.questionnaires');
});

Route::middleware(['auth', 'permission:patient-data.view'])->group(function () {
    Route::get('/admin/patient-data', function () {
        return Inertia::render('admin/patient-data');
    })->name('admin.patient-data');
});

Route::middleware(['auth', 'permission:analytics.view'])->group(function () {
    Route::get('/admin/analytics', function () {
        return Inertia::render('admin/analytics');
    })->name('admin.analytics');
});

Route::middleware(['auth', 'permission:audit-logs.view'])->group(function () {
    Route::get('/admin/audit-logs', function () {
        return Inertia::render('admin/audit-logs');
    })->name('admin.audit-logs');
});

Route::middleware(['auth', 'permission:file-uploads.view'])->group(function () {
    Route::get('/admin/file-uploads', function () {
        return Inertia::render('admin/file-uploads');
    })->name('admin.file-uploads');
});

Route::middleware(['auth', 'permission:settings.view'])->group(function () {
    Route::get('/admin/settings', function () {
        return Inertia::render('admin/settings');
    })->name('admin.settings');
});

Route::middleware(['auth', 'permission:reports.view'])->group(function () {
    Route::get('/admin/reports', function () {
        return Inertia::render('admin/reports');
    })->name('admin.reports');
});


require __DIR__.'/settings.php';
