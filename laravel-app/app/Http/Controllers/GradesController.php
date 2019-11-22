<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Grades;
use App\Http\Resources\Grades as GradesResource;
use App\Http\Resources\GradesCollection;

class GradesController extends Controller
{
    public function index()
    {
        return new GradesCollection(Grades::all());
    }

    public function show($gradesID)
    {
        return new GradesResource(Grades::findOrFail($gradesID));
    }
}
