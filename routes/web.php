<?php


Route::get('/','FrontendController@index')->name('home');
Route::get(trans('routes.object').'/{id}','FrontendController@object')->name('object');
Route::post(trans('routes.roomsearch'),'FrontendController@roomsearch')->name('roomSearch');
Route::get(trans('routes.room').'/{id}','FrontendController@room')->name('room');
Route::get(trans('routes.article').'/{id}','FrontendController@article')->name('article');
Route::get(trans('routes.person').'/{id}','FrontendController@person')->name('person');

Route::get('/searchCities', 'FrontendController@searchCities');
Route::get('/ajaxGetRoomReservations/{id}', 'FrontendController@ajaxGetRoomReservations');

Route::get('/like/{likeable_id}/{type}', 'FrontendController@like')->name('like');
Route::get('/unlike/{likeable_id}/{type}', 'FrontendController@unlike')->name('unlike');

Route::post('/addComment/{commentable_id}/{type}', 'FrontendController@addComment')->name('addComment');
Route::post('/makeReservation/{room_id}/{city_id}', 'FrontendController@makeReservation')->name('makeReservation');


Route::get('/cities', 'FrontendController@cities');


Route::group(['prefix'=>'admin'],function(){

    Route::get('/getNotifications', 'BackendController@getNotifications');
    Route::post('/setReadNotifications', 'BackendController@setReadNotifications');

    Route::get('/','BackendController@index')->name('adminHome');
    Route::get(trans('routes.myobjects'),'BackendController@myobjects')->name('myObjects');
    Route::match(['GET','POST'],trans('routes.saveobject').'/{id?}','BackendController@saveObject')->name('saveObject');
    Route::match(['GET','POST'],trans('routes.profile'),'BackendController@profile')->name('profile');
    Route::get('/deletePhoto/{id}', 'BackendController@deletePhoto')->name('deletePhoto');
    Route::match(['GET','POST'],trans('routes.saveroom').'/{id?}', 'BackendController@saveRoom')->name('saveRoom');
    Route::get(trans('routes.deleteroom').'/{id}', 'BackendController@deleteRoom')->name('deleteRoom');


    Route::get('/deleteArticle/{id}', 'BackendController@deleteArticle')->name('deleteArticle');
    Route::post('/saveArticle/{id?}', 'BackendController@saveArticle')->name('saveArticle');

    Route::get('/ajaxGetReservationData', 'BackendController@ajaxGetReservationData');
    Route::get('/ajaxSetReadNotification', 'BackendController@ajaxSetReadNotification');
    Route::get('/ajaxGetNotShownNotifications', 'BackendController@ajaxGetNotShownNotifications');
    Route::get('/ajaxSetShownNotifications', 'BackendController@ajaxSetShownNotifications');

    Route::get('/confirmReservation/{id}', 'BackendController@confirmReservation')->name('confirmReservation');
    Route::get('/deleteReservation/{id}', 'BackendController@deleteReservation')->name('deleteReservation');

    Route::resource('cities', 'CityController');

    Route::get(trans('routes.deleteobject'). '/{id}', 'BackendController@deleteObject')->name('deleteObject');


});


Auth::routes();

