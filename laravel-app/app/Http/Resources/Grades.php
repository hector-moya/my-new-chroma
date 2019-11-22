<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Grades extends JsonResource
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
            'gradeID'         => $this->gradeID,
            'gradeName'       => $this->gradeName,
            'gradeDescription'    => $this->gradeDescription,
        ];
    }
}
