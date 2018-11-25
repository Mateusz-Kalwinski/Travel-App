<?php

namespace App\Enjoythetrip\Gateways;

use App\Enjoythetrip\Interfaces\BackendRepositoryInterface;

class BackendGateway {

    public function __construct(BackendRepositoryInterface $bR)
    {
        $this->bR = $bR;
    }

    public function getReservations($request) {

        if ($request->user()->hasRole(['owner', 'admin'])){

            $object = $this->bR->getOwnerReservations($request);

        }else{

            $object = $this->bR->getTouristReservations($request);

        }

        return $object;

    }

}