<?php

namespace App\Controller\Auth;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
// Custom
use App\Service\BearerTokenExtraction;

#[Route('api')]
class VerifyAuthenticationController extends AbstractController
{
    #[Route('/auth/refresh-data', name: 'app_auth_verify_authentication')]
    public function index(Request $request): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/Auth/VerifyAuthenticationController.php',
        ]);
    }
}
