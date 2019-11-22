<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Products;
use App\Http\Resources\Products as ProductsResource;
use App\Http\Resources\ProductsCollection;

class ProductsController extends Controller
{
    public function index()
    {
        return new ProductsCollection(Products::all());
    }

    public function show($gradeID)
    {
        return new ProductsResource(Products::findOrFail($gradeID));
    }

    public function store(Request $request)
    {

        $product = Products::create($request->all());

        return (new ProductsResource($product))
            ->response()
            ->setStatusCode(201);
    }
}
