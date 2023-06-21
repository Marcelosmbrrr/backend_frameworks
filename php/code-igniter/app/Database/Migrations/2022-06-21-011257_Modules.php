<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Modules extends Migration
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
                'default' => 'CURRENT_TIMESTAMP',
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
        $this->forge->createTable('modules');
    }

    public function down()
    {
        $this->forge->dropTable('modules');
    }
}
