<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->BigIncrements('id');
            $table->BigInteger('user_id')->unsigned();
            $table->string('filename');
            $table->timestamps();
            //外部キー制約 できない??
            // $table->foreign('user_id')->references('id')->on('users'); 
            // ->constrained()
            // ->cascadeOnDelete()  // ON DELETE で CASCADE
            // ->cascadeOnUpdate(); // ON UPDATE で CASCADE;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
