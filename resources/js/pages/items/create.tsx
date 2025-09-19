import React from 'react';
import AppLayout from '@/components/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

interface Category {
    id: number;
    name: string;
    code: string;
}

interface Vendor {
    id: number;
    name: string;
    company: string;
}



interface Props {
    categories: Category[];
    vendors: Vendor[];
    [key: string]: unknown;
}

export default function CreateItem({ categories, vendors }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        description: '',
        category_id: '',
        vendor_id: '',
        type: '',
        purchase_price: '',
        selling_price: '',
        current_stock: '0',
        minimum_stock: '0',
        unit: '',
        location: '',
        barcode: '',
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('items.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Redirect handled by controller
            },
            onError: () => {
                // Errors handled by Inertia
            }
        });
    };

    const generateCode = () => {
        const prefix = 'ITM';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        setData('code', `${prefix}-${timestamp}-${random}`);
    };

    return (
        <AppLayout>
            <Head title="Tambah Barang - Warehouse Management System" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">➕ Tambah Barang</h1>
                        <p className="text-gray-600 mt-1">Tambahkan barang baru ke dalam sistem gudang</p>
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={() => router.get(route('items.index'))}
                    >
                        ← Kembali ke Daftar
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>📋 Form Tambah Barang</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Informasi Dasar</h3>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="code">Kode Barang *</Label>
                                        <div className="flex space-x-2">
                                            <Input
                                                id="code"
                                                type="text"
                                                value={data.code}
                                                onChange={(e) => setData('code', e.target.value)}
                                                placeholder="ITM-XXXXXX-XXX"
                                                className="flex-1"
                                            />
                                            <Button type="button" variant="outline" onClick={generateCode}>
                                                🎲 Generate
                                            </Button>
                                        </div>
                                        {errors.code && <p className="text-sm text-red-600">{errors.code}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Barang *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Masukkan nama barang"
                                        />
                                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Deskripsi</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Deskripsi barang (opsional)"
                                            rows={3}
                                        />
                                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category_id">Kategori *</Label>
                                        <Select 
                                            id="category_id"
                                            value={data.category_id} 
                                            onValueChange={(value) => setData('category_id', value)}
                                        >
                                            <option value="">Pilih kategori</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id.toString()}>
                                                    {category.name} ({category.code})
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="vendor_id">Vendor *</Label>
                                        <Select 
                                            id="vendor_id"
                                            value={data.vendor_id} 
                                            onValueChange={(value) => setData('vendor_id', value)}
                                        >
                                            <option value="">Pilih vendor</option>
                                            {vendors.map((vendor) => (
                                                <option key={vendor.id} value={vendor.id.toString()}>
                                                    {vendor.company} - {vendor.name}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.vendor_id && <p className="text-sm text-red-600">{errors.vendor_id}</p>}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Detail Barang</h3>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Tipe Barang *</Label>
                                        <Select 
                                            id="type"
                                            value={data.type} 
                                            onValueChange={(value) => setData('type', value)}
                                        >
                                            <option value="">Pilih tipe barang</option>
                                            <option value="consumable">Habis Pakai</option>
                                            <option value="asset">Aset</option>
                                            <option value="spare_part">Spare Part</option>
                                        </Select>
                                        {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="purchase_price">Harga Beli *</Label>
                                            <Input
                                                id="purchase_price"
                                                type="number"
                                                step="0.01"
                                                value={data.purchase_price}
                                                onChange={(e) => setData('purchase_price', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            {errors.purchase_price && <p className="text-sm text-red-600">{errors.purchase_price}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="selling_price">Harga Jual *</Label>
                                            <Input
                                                id="selling_price"
                                                type="number"
                                                step="0.01"
                                                value={data.selling_price}
                                                onChange={(e) => setData('selling_price', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            {errors.selling_price && <p className="text-sm text-red-600">{errors.selling_price}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current_stock">Stok Saat Ini *</Label>
                                            <Input
                                                id="current_stock"
                                                type="number"
                                                value={data.current_stock}
                                                onChange={(e) => setData('current_stock', e.target.value)}
                                                placeholder="0"
                                            />
                                            {errors.current_stock && <p className="text-sm text-red-600">{errors.current_stock}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="minimum_stock">Stok Minimum *</Label>
                                            <Input
                                                id="minimum_stock"
                                                type="number"
                                                value={data.minimum_stock}
                                                onChange={(e) => setData('minimum_stock', e.target.value)}
                                                placeholder="0"
                                            />
                                            {errors.minimum_stock && <p className="text-sm text-red-600">{errors.minimum_stock}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="unit">Satuan *</Label>
                                        <Select 
                                            id="unit"
                                            value={data.unit} 
                                            onValueChange={(value) => setData('unit', value)}
                                        >
                                            <option value="">Pilih satuan</option>
                                            <option value="pcs">Pieces (pcs)</option>
                                            <option value="kg">Kilogram (kg)</option>
                                            <option value="liter">Liter</option>
                                            <option value="meter">Meter</option>
                                            <option value="box">Box</option>
                                            <option value="set">Set</option>
                                        </Select>
                                        {errors.unit && <p className="text-sm text-red-600">{errors.unit}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">Lokasi Penyimpanan</Label>
                                        <Input
                                            id="location"
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="Contoh: Rak A-12"
                                        />
                                        {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="barcode">Barcode</Label>
                                        <Input
                                            id="barcode"
                                            type="text"
                                            value={data.barcode}
                                            onChange={(e) => setData('barcode', e.target.value)}
                                            placeholder="Barcode barang (opsional)"
                                        />
                                        {errors.barcode && <p className="text-sm text-red-600">{errors.barcode}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status *</Label>
                                        <Select 
                                            id="status"
                                            value={data.status} 
                                            onValueChange={(value) => setData('status', value)}
                                        >
                                            <option value="active">Aktif</option>
                                            <option value="inactive">Tidak Aktif</option>
                                        </Select>
                                        {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => router.get(route('items.index'))}
                                    disabled={processing}
                                >
                                    Batal
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? '⏳ Menyimpan...' : '💾 Simpan Barang'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}