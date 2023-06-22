<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

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

        // Generate
        $this->forge->createTable('roles');
    }

    public function down()
    {
        $this->forge->dropTable('roles');
    }
}
