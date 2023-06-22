<?php

namespace App\Models;

use CodeIgniter\Model;
use App\Entities\UserEntity;

class User extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = UserEntity::class;
    protected $useSoftDeletes   = true;
    protected $protectFields    = true;
    protected $allowedFields    = ['name', 'email', 'role_id', 'created_at', 'updated_at', 'deleted_at'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        "name" => "required|min_length[3]|max_length[100]",
        "email" => "required|valid_email|is_unique[users.email]",
        "password" => "required",
        "role_id" => "required|integer"
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = ['sendRegistrationNotification'];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = ['sendUpdateNotification'];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = ['sendDeletionNotification'];

    protected function sendRegistrationNotification(array $data){
        //
    }

    protected function sendUpdateNotification(array $data){
        //
    }

    protected function sendDeletionNotification(array $data){
        //
    }
}
