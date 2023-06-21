<?php

namespace App\Controllers\Modules;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Modules\DashboardService;

class DashboardController extends BaseController
{
    use ResponseTrait;

    function __construct(DashboardService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $payload = $this->service->index();
        return $this->respond($payload, 200);
    }
}
