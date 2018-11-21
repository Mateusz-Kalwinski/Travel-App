<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enjoythetrip\Interfaces\FrontendRepositoryInterface;
use App\Enjoythetrip\Gateways\FrontendGateway;

class FrontendController extends Controller
{

    public function __construct(FrontendRepositoryInterface $frontendRepository, FrontendGateway $frontendGateway) {
        $this->fR = $frontendRepository;
        $this->fG = $frontendGateway;
    }

    public function index() {
        $objects = $this->fR->getObjectsForMainPage();

        return view('frontend.index',['objects'=>$objects]);
    }


    public function article() {
        return view('frontend.article');
    }


    public function object($id) {
        $object = $this->fR->getObject($id);

        return view('frontend.object',['object'=>$object]);
    }


    public function person() {
        return view('frontend.person');
    }


    public function room() {
        return view('frontend.room');
    }


    public function roomsearch(Request $request) {

        if ($city = $this->fG->getSearchResults($request)){
            dd($city);
            return view('frontend.roomsearch', ['city' => $city]);
        }else{
            if (!$request->ajax())
                return redirect('/')->with('norooms',__('No offers were found matching the criteria'));
        }
    }



    public function searchCities(Request $request) {

        $results = $this->fG->searchCities($request);

        return response()->json($results);
    }


}