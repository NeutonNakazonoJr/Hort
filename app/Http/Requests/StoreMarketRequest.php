<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMarketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|required|unique:markets|max:50|min:3',
            'nickname' => 'string|required|unique:markets|max:10|min:3'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'A name is required.',
            'name.unique' => 'The name must be unique among markets.',
            'name.max' => 'The name must not exceed 50 characters.',
            'name.min' => 'The name must be at least 3 characters long.',
            'name.string' => 'The name must be a string.',

            'nickname.required' => 'A nickname is required.',
            'nickname.unique' => 'The nickname must be unique among markets.',
            'nickname.max' => 'The nickname must not exceed 10 characters.',
            'nickname.min' => 'The nickname must be at least 3 characters long.',
            'nickname.string' => 'The nickname must be a string.',
        ];
    }
}
