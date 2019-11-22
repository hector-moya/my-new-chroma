<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Consistencies;
use App\Http\Resources\Consistencies as ConsistenciesResource;
use App\Http\Resources\ConsistenciesCollection;

class ConsistenciesController extends Controller
{
    public function index()
    {
        return new ConsistenciesCollection(Consistencies::all());
    }

    public function show($consistenciesID)
    {
        return new ConsistenciesResource(Consistencies::findOrFail($consistenciesID));
    }
}
