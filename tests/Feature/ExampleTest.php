<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     * テスト実行時
     * UnitとFeature両方で実行される？
     * testは表示されない
     * 大文字の間はスペースが入る
     * アンスコも表示されない
     * ./vendor/bin/phpunit テストファイル名
     *  エイリアス？パス設定しなければ、このように実行
     * 
     */
    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
