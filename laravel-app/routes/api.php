<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// User
Route::get('/users', 'UserController@index');
Route::get('/users/{userID}', 'UserController@show');
Route::post('/users', 'UserController@store');
Route::delete('/users', 'UserController@delete');

//Grades
Route::get('/grades', 'GradesController@index');
Route::get('/grades/{gradesID}', 'GradesController@show');

//Grades
Route::get('/productprices', 'ProductPriceController@index');
Route::get('/productprices/{productID}', 'ProductPriceController@show');

//Consistencies
Route::get('/consistencies', 'ConsistenciesController@index');
Route::get('/consistencies/{consistencyID}', 'ConsistenciesController@show');

//Manufacturers
Route::get('/manufacturers', 'ManufacturersController@index');
Route::get('/manufacturers/{manufacturerID}', 'ManufacturersController@show');

//Mediums
Route::get('/mediums', 'MediumsController@index');
Route::get('/mediums/{mediumsID}', 'MediumsController@show');

//Roles
Route::get('/roles', 'RolesController@index');
Route::get('/roles/{rolesID}', 'RolesController@show');

//Products
Route::post('/products', 'ProductsController@store');
Route::get('/products', 'ProductsController@index');
Route::get('/products/{productID}', 'ProductsController@show');

//Stores
Route::post('/stores', 'StoresController@store');
Route::get('/stores', 'StoresController@index');
Route::get('/stores/{storeID}', 'StoresController@show');

//Product Search
Route::post('/search', 'ProductSearchController@filter');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
