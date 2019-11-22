<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\ProductPrice;
use App\Http\Resources\ProductPrice as ProductPriceResource;
use App\Http\Resources\ProductPriceCollection;

class ProductPriceController extends Controller
{
    public function index()
    {
        /*$data = DB::table('productprices')
            ->join('store', 'productprices.storeID', '=', 'store.storeID')
            ->select('productprices.*', 'store.storeName', 'store.websiteURL')
            ->get();
        return $data;*/

        return new ProductPriceCollection(ProductPrice::all());
    }

    public function show($productID)
    {
        return new ProductPriceResource(ProductPrice::findOrFail($productID));
    }
}
