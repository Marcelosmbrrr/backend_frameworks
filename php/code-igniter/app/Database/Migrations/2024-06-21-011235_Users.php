<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
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
            "email" => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            "active" => [
                'type' => 'boolean',
                'default' => false
            ],
            "role_id" => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            "image" => [
                'type' => 'VARCHAR',
                'default' => 'default.jpg',
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
        $this->forge->addKey('role_id', true);
        $this->forge->createTable('users');

        // Foreign Keys
        $this->forge->addForeignKey('role_id', 'roles', 'id');
    }

    public function down()
    {
        $this->forge->dropTable('users');
    }
}
