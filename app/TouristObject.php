<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TouristObject extends Model
{
    protected $table = 'objects';

    public function city(){

        return $this->belongsTo('App\City');

    }

    public function photos(){

        return $this->morphMany('App\Photo','photoable');

    }
}
