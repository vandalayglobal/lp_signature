<?php
    // MyVendor\contactform\src\routes\web.php
   
    // MyVendor\contactform\src\routes\web.php
    Route::group(['namespace' => 'marriagetax\signature\Http\Controllers', 'middleware' => ['web']], function(){
        Route::get('signature', 'SignatureController@index');
    });
     // Signature routes
    // Route::get('/signature','SignatureController@index')->name('signature');
?>