<?php

use Illuminate\Support\Facades\Route;

/* Routes de présentation : à placer dans routes/web.php d'une installation Laravel. */
Route::view('/', 'home')->name('home');
Route::view('/devis', 'quote')->name('quote');
