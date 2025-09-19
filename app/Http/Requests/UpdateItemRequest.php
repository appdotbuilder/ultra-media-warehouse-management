<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && in_array(auth()->user()->role, ['admin', 'staff_gudang', 'purchasing']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $itemId = $this->route('item')->id;

        return [
            'code' => 'required|string|max:20|unique:items,code,' . $itemId,
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'vendor_id' => 'required|exists:vendors,id',
            'type' => 'required|in:consumable,asset,spare_part',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'minimum_stock' => 'required|integer|min:0',
            'unit' => 'required|string|max:20',
            'location' => 'nullable|string|max:100',
            'barcode' => 'nullable|string|max:50|unique:items,barcode,' . $itemId,
            'status' => 'required|in:active,inactive',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'code.required' => 'Kode barang harus diisi.',
            'code.unique' => 'Kode barang sudah digunakan.',
            'name.required' => 'Nama barang harus diisi.',
            'category_id.required' => 'Kategori harus dipilih.',
            'category_id.exists' => 'Kategori tidak valid.',
            'vendor_id.required' => 'Vendor harus dipilih.',
            'vendor_id.exists' => 'Vendor tidak valid.',
            'type.required' => 'Tipe barang harus dipilih.',
            'purchase_price.required' => 'Harga beli harus diisi.',
            'purchase_price.numeric' => 'Harga beli harus berupa angka.',
            'selling_price.required' => 'Harga jual harus diisi.',
            'selling_price.numeric' => 'Harga jual harus berupa angka.',
            'current_stock.required' => 'Stok saat ini harus diisi.',
            'minimum_stock.required' => 'Stok minimum harus diisi.',
            'unit.required' => 'Satuan harus diisi.',
            'barcode.unique' => 'Barcode sudah digunakan.',
        ];
    }
}