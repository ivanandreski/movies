<?php

use App\Models\Status;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('code'); // -1 to download, 0 to watch, 1 watched
            $table->string('name');
        });

        Status::insert([
            ['code' => -1, 'name' => 'Download'],
            ['code' => 0, 'name' => 'Watch'],
            ['code' => 1, 'name' => 'Watched'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('status');
    }
};
