<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Stores;
use App\Http\Resources\Stores as StoresResource;
use App\Http\Resources\StoresCollection;

class StoresController extends Controller
{
    public function index()
    {
        return new StoresCollection(Stores::all());
    }

    public function show($storeID)
    {
        return new StoresResource(Stores::findOrFail($storeID));
    }


    public function store(Request $request)
    {

        $stores = Stores::create($request->all());

        return (new StoresResource($stores))
            ->response()
            ->setStatusCode(201);
    }
}
