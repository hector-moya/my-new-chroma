<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consistencies extends Model
{
    protected $table = 'consistencies';
    protected $primaryKey = 'consistencyID';

    protected $fillable = ['consistencyID', 'consistencyName', 'consistencyDescription'];
}
