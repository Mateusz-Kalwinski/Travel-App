<?php

namespace App\Enjoythetrip\Repositories;

use App\TouristObject;
use App\Enjoythetrip\Interfaces\FrontendRepositoryInterface;

class FrontendRepository implements FrontendRepositoryInterface{

    public function getObjectsForMainPage(){

//        return TouristObject::all();
        return TouristObject::with(['city', 'photos'])->ordered()->paginate(8);
    }

    public function getObject($id){

        return TouristObject::find($id);
    }

}