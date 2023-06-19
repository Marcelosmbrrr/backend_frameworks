<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authentication\AuthenticationController;
use App\Http\Controllers\Modules\{
    DashboardController,
    UsersController,
    RolesController
};

Route::post("/auth/signin", [AuthenticationController::class, "signIn"]);
Route::post("/auth/signup", [AuthenticationController::class, "signUp"]);

Route::middleware(["auth"])->group(function () {
    Route::post("/auth/signout", [AuthenticationController::class, "signOut"]);
    Route::get("/auth/refresh-data", [AuthenticationController::class, "refreshAndVerifyAuthentication"]);
    Route::get("/dashboard", DashboardController::class);
    Route::resource("/users", UsersController::class);
    Route::resource("/roles", RolesController::class);
});
