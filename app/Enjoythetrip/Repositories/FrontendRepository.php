<?php

namespace App\Enjoythetrip\Repositories;

use App\Enjoythetrip\Interfaces\FrontendRepositoryInterface;
use App\{Reservation, TouristObject, City, Room};

class FrontendRepository implements FrontendRepositoryInterface  {

    public function getObjectsForMainPage()
    {
        // return TouristObject::all();
        return TouristObject::with(['city','photos'])->ordered()->paginate(8);
    }

    public function getObject($id)
    {
        //return TouristObject::find($id);

        // rooms.object.city   for json mobile because there is no lazy loading there
        return  TouristObject::with(['city','photos', 'address','users.photos','rooms.photos','comments.user','articles.user','rooms.object.city'])->find($id);
    }

    public function getSearchCities( string $term)
    {
        return  City::where('name', 'LIKE', $term . '%')->get();
    }

    public function getSearchResults(string $city){

        return City::with(['rooms.reservations', 'rooms.photos', 'rooms.object.photos'])->where('name', $city)->first() ?? false;

    }

    public function getRoom($id) {

        return Room::with(['object.address'])->find($id);

    }

    public function getReservationsByRoomId($room_id)
    {

        return Reservation::where('room_id', $room_id)->get();
    }


}