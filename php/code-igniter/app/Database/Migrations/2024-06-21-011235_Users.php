<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

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
            "image" => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'default' => 'default.jpg',
            ],
            "active" => [
                'type' => 'BOOLEAN',
                'default' => false
            ],
            "role_id" => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            "created_at" => [
                'type'    => 'TIMESTAMP',
                'default' => new RawSql('CURRENT_TIMESTAMP'),
            ],
            "updated_at" => [
                'type' => 'TIMESTAMP',
                'null' => true,
            ],
            "deleted_at" => [
                'type' => 'TIMESTAMP',
                'null' => true,
            ]
        ]);
        // Primary key
        $this->forge->addKey('id', true);
        // Foreign key
        $this->forge->addForeignKey('role_id', 'roles', 'id');

        // Generate
        $this->forge->createTable('users');
    }

    public function down()
    {
        $this->forge->dropTable('users');
    }
}
