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
                'type' => 'boolean',
                'default' => true,
            ],
            "token" => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ]
        ]);
        $this->forge->createTable('api_tokens');

        // Foreign Keys
        $this->forge->addForeignKey('user_id', 'users', 'id');
    }

    public function down()
    {
        $this->forge->dropTable('api_tokens');
    }
}
