<?php
namespace vandalayglobal\lp_signature;
use Illuminate\Support\ServiceProvider;
    class SignatureServiceProvider extends ServiceProvider {
        public function boot()
        {
            $this->loadRoutesFrom(__DIR__.'/routes/web.php');
            $this->loadViewsFrom(__DIR__.'/resources/views', 'signature');
            $this->publishes([
                                __DIR__.'/resources/assets' => public_path('vandalayglobal/signature'),
            ], 'public');
        }
        public function register()
        {
        }
    }
?>