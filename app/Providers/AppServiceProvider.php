<?php


namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider {
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot() {

        View::composer('frontend.*', function ($view) {
            $view->with('placeholder', asset('images/placeholder.jpg'));
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register() {

        $this->app->bind(\App\Enjoythetrip\Interfaces\FrontendRepositoryInterface::class,function()
        {
            return new \App\Enjoythetrip\Repositories\FrontendRepository;
        });
    }
}
