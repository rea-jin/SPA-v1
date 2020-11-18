<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItem extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // 投稿写真のマイムタイプを決める
            'item' => 'requrired|file|mimes:jpg,jpeg,png,gif'
            // ファイルサイズの制限もつける
            
        ];
    }
}
