<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Manufacturers extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'manufacturerID'         => $this->manufacturerID,
            'manufacturerName'       => $this->manufacturerName,
            'country'    => $this->country,
            'state'    => $this->state,
            'address'    => $this->address,
            'phoneNumber'    => $this->phoneNumber,
            'email'    => $this->email,
        ];
    }
}
