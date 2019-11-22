<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grades extends Model
{
    protected $table = 'grades';
    protected $primaryKey = 'gradeID';

    protected $fillable = ['gradeID', 'gradeName', 'gradeDescription'];
}

