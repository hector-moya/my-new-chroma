<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\ProductSearch\ProductSearch;

class ProductSearchController extends Controller
{
    public function filter(Request $request)
    {
        return ProductSearch::apply($request);
    }
}
