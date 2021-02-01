<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// 以下追加
use App\Item;
use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;




class ItemSubmitApiTest extends TestCase
{
    /**
     * A basic feature test example.
     * テストユーザーを作る
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_ファイルをアップロード()
    {
        // S3ではなくテスト用のストレージを使用する
        // → storage/framework/testing
        Storage::fake('s3');

        $response = $this->actingAs($this->user)
            ->json('POST', route('item.create'), [
                // ダミーファイルを作成して送信している
                'item' => UploadedFile::fake()->image('photo.jpg'),
            ]);

        // レスポンスが201(CREATED)であること
        $response->assertStatus(201);

        $photo = Item::first();

        // 写真のIDが12桁のランダムな文字列であること
        $this->assertRegExp('/^[0-9a-zA-Z-_]{12}$/', $item->id);

        // DBに挿入されたファイル名のファイルがストレージに保存されていること
        Storage::cloud()->assertExists($item->filename);
    }

    /**
     * @test
     */
    public function should_データベースエラーの場合はファイルを保存しない()
    {
        // 乱暴だがこれでDBエラーを起こす
        Schema::drop('item');

        Storage::fake('s3');

        $response = $this->actingAs($this->user)
            ->json('POST', route('item.create'), [
                'item' => UploadedFile::fake()->image('item.jpg'),
            ]);

        // レスポンスが500(INTERNAL SERVER ERROR)であること
        $response->assertStatus(500);

        // ストレージにファイルが保存されていないこと
        $this->assertEquals(0, count(Storage::cloud()->files()));
    }

    /**
     * @test
     */
    public function should_ファイル保存エラーの場合はDBへの挿入はしない()
    {
        // ストレージをモックして保存時にエラーを起こさせる
        Storage::shouldReceive('cloud')
            ->once()
            ->andReturnNull();

        $response = $this->actingAs($this->user)
            ->json('POST', route('item.create'), [
                'item' => UploadedFile::fake()->image('item.jpg'),
            ]);

        // レスポンスが500(INTERNAL SERVER ERROR)であること
        $response->assertStatus(500);

        // データベースに何も挿入されていないこと
        $this->assertEmpty(Item::all());
    }
}

