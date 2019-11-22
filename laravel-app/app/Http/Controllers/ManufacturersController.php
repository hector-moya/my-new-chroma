<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Manufacturers;
use App\Http\Resources\Manufacturers as ManufacturersResource;
use App\Http\Resources\ManufacturersCollection;

class ManufacturersController extends Controller
{
    public function index()
    {
        return new ManufacturersCollection(Manufacturers::all());
    }

    public function show($manufacturerID)
    {
        return new ManufacturersResource(Manufacturers::findOrFail($manufacturerID));
    }
}
