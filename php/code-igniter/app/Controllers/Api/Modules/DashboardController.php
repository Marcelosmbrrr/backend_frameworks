<?php

namespace App\Controllers\Api\Modules;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Services\Modules\DashboardService;

class DashboardController extends BaseController
{
    use ResponseTrait;

    function __construct()
    {
        $this->service = new DashboardService();
    }

    public function index()
    {
        $payload = $this->service->index();
        return $this->respond($payload, 200);
    }
}
