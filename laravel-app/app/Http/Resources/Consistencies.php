<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Consistencies extends JsonResource
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
            'consistencyID'         => $this->consistencyID,
            'consistencyName'       => $this->consistencyName,
            'consistencyDescription'    => $this->consistencyDescription,
        ];
    }
}
