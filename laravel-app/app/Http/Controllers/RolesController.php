<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Roles;
use App\Http\Resources\Roles as RolesResource;
use App\Http\Resources\RolesCollection;

class RolesController extends Controller
{
    public function index()
    {
        return new RolesCollection(Roles::all());
    }

    public function show($rolesID)
    {
        return new RolesResource(Roles::findOrFail($rolesID));
    }
}
