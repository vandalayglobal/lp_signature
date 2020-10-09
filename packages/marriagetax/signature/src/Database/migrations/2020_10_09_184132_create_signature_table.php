<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignatureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('signatures', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('bank_id')->nullable();
            $table->enum('type', ['digital', 'wet'])->default('wet');
            $table->text('signature_image')->nullable();
            $table->text('pdf_file')->nullable();
            $table->text('s3_file_path')->nullable();
            $table->enum('status', ['1', '0'])->default('1');
            $table->string('previous_name',255)->nullable();            
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['user_id','bank_id','type','status','created_at'],'signature_indx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('signature');
    }
}
