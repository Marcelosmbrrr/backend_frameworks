<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ModuleRole extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "role_id" => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            "module_id" => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            "read" => [
                'type' => 'BOOLEAN',
                'default' => false,
            ],
            "write" => [
                'type' => 'BOOLEAN',
                'default' => false,
            ]
        ]);
        // Primary key
        $this->forge->addKey('id', true);
        // Foreign key
        $this->forge->addForeignKey('role_id', 'roles', 'id');
        $this->forge->addForeignKey('module_id', 'modules', 'id');

        // Generate
        $this->forge->createTable('module_role');
    }

    public function down()
    {
        $this->forge->dropTable('module_role');
    }
}
