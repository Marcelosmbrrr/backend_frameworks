<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authentication\{
    SignInController,
    SignOutController,
    SignUpController,
    RefreshAndVerifyAuthenticationController
};
use App\Http\Controllers\Modules\{
    DashboardController,
    UsersController,
    RolesController
};

Route::post("/auth/signin", SignInController::class);
Route::post("/auth/signup", SignUpController::class);

Route::middleware(["auth"])->group(function () {
    Route::post("/auth/signout", SignOutController::class);
    Route::get("/auth/refresh-data", RefreshAndVerifyAuthenticationController::class);
    Route::get("/dashboard", DashboardController::class);
    Route::apiResource("/users", UsersController::class);
    Route::apiResource("/roles", RolesController::class);
});
