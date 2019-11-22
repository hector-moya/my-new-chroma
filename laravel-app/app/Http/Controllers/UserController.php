<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return new UserCollection(User::all());
    }
    public function show($userID)
    {
        return new UserResource(User::findOrFail($userID));
    }
    public function store (Request $request)
    {
        $request->validate([
            'userName' => 'required | max:255',
        ]);

        $user = User::create($request->all());

        return (new UserResource($user))
        ->response()
        ->setStatusCode(201);

    }
    public function delete($userID)
    {
        $user = User::findOrFail($userID);
        $user->delete();

        return response()->json(null,204);
    }
}
