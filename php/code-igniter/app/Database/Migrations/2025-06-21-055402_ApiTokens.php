<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ApiTokens extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            "user_id" => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            "is_valid" => [
                'type' => 'BOOLEAN',
                'default' => true,
            ],
            "token" => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ]
        ]);
        // Primary key
        $this->forge->addKey('id', true);
        // Foreign key
        $this->forge->addForeignKey('user_id', 'users', 'id');

        // Generate
        $this->forge->createTable('api_tokens');
    }

    public function down()
    {
        $this->forge->dropTable('api_tokens');
    }
}
