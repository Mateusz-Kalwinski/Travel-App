<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enjoythetrip\Interfaces\FrontendRepositoryInterface;

class FrontendController extends Controller
{

    public function __construct(FrontendRepositoryInterface $frontendRepository) {
        $this->fR = $frontendRepository;
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

    public function roomsearch() {
        return view('frontend.roomsearch');
    }

}
