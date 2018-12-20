<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Session;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function flashMsg($class, $message){

        Session::flash('message', $message);
        Session::flash('alert-class', 'alert-'.$class);

    }

    protected function setMiddleware()
    {
        if( \Request::Ajax() && !\Request::has('fromWebApp') )
            $middleware = 'jwt.auth';
        else
            $middleware = 'auth';

        return $middleware;
    }

    protected function makeResponse($view, $objects = [])
    {
        if (\Request::ajax())
        {
            return \Response::json($objects);
        }

        return view($view, $objects);
    }
}
