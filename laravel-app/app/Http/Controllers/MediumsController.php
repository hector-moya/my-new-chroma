<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Mediums;
use App\Http\Resources\Mediums as MediumsResource;
use App\Http\Resources\MediumsCollection;

class MediumsController extends Controller
{
    public function index()
    {
        return new MediumsCollection(Mediums::all());
    }

    public function show($mediumsID)
    {
        return new MediumsResource(Mediums::findOrFail($mediumsID));
    }
}
