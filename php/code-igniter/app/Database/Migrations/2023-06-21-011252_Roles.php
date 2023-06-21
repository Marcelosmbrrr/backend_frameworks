<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Roles extends Migration
{

    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "name" => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            "created_at" => [
                'type' => 'timestamp',
                'default' => 'CURRENT_TIMESTAMP'
            ],
            "updated_at" => [
                'type' => 'timestamp',
                'null' => true,
            ],
            "deleted_at" => [
                'type' => 'timestamp',
                'null' => true,
            ]
        ]);
        $this->forge->createTable('roles');

        $this->forge->addField([
            "role_id" => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            "module_id" => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            "read" => [
                'type' => 'boolean',
                'default' => false,
            ],
            "write" => [
                'type' => 'boolean',
                'default' => false,
            ]
        ]);
        $this->forge->createTable('module_role');

        // Foreign Keys
        $this->forge->addForeignKey('role_id', 'roles', 'id');
        $this->forge->addForeignKey('module_id', 'modules', 'id');
    }

    public function down()
    {
        $this->forge->dropTable('module_role');
        $this->forge->dropTable('roles');
    }
}