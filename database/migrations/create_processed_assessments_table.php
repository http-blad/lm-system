<?php

// Migration for ProcessedAssessments Table
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('processed_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained('assessments')->onDelete('cascade');
            $table->text('processed_content');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('processed_assessments');
    }
};
