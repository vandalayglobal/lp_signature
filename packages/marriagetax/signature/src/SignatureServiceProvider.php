<?php
    namespace marriagetax\signature;
    use Illuminate\Support\ServiceProvider;
    class SignatureServiceProvider extends ServiceProvider {
        public function boot()
        {
            $this->loadRoutesFrom(__DIR__.'/routes/web.php');
            $this->loadViewsFrom(__DIR__.'/resources/views', 'contactform');
            $this->loadMigrationsFrom(__DIR__.'/Database/migrations');
        }
        public function register()
        {
        }
    }
    ?>