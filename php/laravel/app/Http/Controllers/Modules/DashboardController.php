<?php

namespace App\Http\Controllers\Modules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Modules\DashboardService;

class DashboardController extends Controller
{
    function __construct(DashboardService $service)
    {
        $this->service = $service;
    }

    public function __invoke()
    {
        try {
            $data = $this->service->index();
            return response($data, 200);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
}
