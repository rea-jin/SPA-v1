<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
Route::get('/', function () {
    return view('welcome');
});
*/

// APIのURL以外のリクエスト（全てのURL）に対してはindexテンプレートを返す
// 画面遷移はフロントエンドのVueRouterが制御する
// fn()=> これはphp7.4からかける
Route::get('/{any?}', fn() => view('index'))->where('any', '.+');