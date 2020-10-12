<?php
    namespace marriagetax\signature;
    use Illuminate\Support\ServiceProvider;
    class SignatureServiceProvider extends ServiceProvider {
        public function boot()
        {
            $this->loadRoutesFrom(__DIR__.'/routes/web.php');
            $this->loadViewsFrom(__DIR__.'/resources/views', 'signature');
            $this->loadMigrationsFrom(__DIR__.'/Database/migrations');
            $this->publishes([
        __DIR__.'/resources/assets' => public_path('marriagetax/signature'),
    ], 'public');
        }
        public function register()
        {
        }
    }
    ?>