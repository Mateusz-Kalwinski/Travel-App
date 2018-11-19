<?php

namespace App\Http\Controllers;

use App\Enjoythetrip\Interfaces\FrontendRepositoryInterface;
use Illuminate\Http\Request;

class FrontendController extends Controller
{

    public function __construct(FrontendRepositoryInterface $frontendRepository)
    {
        $this->fR = $frontendRepository;
    }

    public function index(){

        $object = $this->fR->getObjectsForMainPage();

        return view('frontend.index', ['objects' => $object]);
    }

    public function article(){
        return view('frontend.article');
    }

    public function object(){
        return view('frontend.object');
    }

    public function person(){
        return view('frontend.person');
    }

    public function room(){
        return view('frontend.room');
    }

    public function roomsearch(){
        return view('frontend.roomsearch');
    }

}
