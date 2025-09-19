import React from 'react';
import AppLayout from '@/components/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

interface Item {
    id: number;
    code: string;
    name: string;
    type: string;
    current_stock: number;
    minimum_stock: number;
    unit: string;
    purchase_price: number;
    selling_price: number;
    status: string;
    is_low_stock: boolean;
    category: Category;
    vendor: Vendor;
}

interface ItemsData {
    data: Item[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    items: ItemsData;
    categories: Category[];
    vendors: Vendor[];
    filters: {
        search?: string;
        category_id?: string;
        vendor_id?: string;
        type?: string;
        status?: string;
        low_stock?: string;
    };
    [key: string]: unknown;
}

export default function ItemsIndex({ items, categories }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(price);
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
        if (status === 'active') {
            return `${baseClasses} bg-green-100 text-green-700`;
        }
        return `${baseClasses} bg-gray-100 text-gray-700`;
    };

    const getTypeBadge = (type: string) => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
        switch (type) {
            case 'consumable':
                return `${baseClasses} bg-blue-100 text-blue-700`;
            case 'asset':
                return `${baseClasses} bg-purple-100 text-purple-700`;
            case 'spare_part':
                return `${baseClasses} bg-amber-100 text-amber-700`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-700`;
        }
    };

    return (
        <AppLayout>
            <Head title="Master Barang - Warehouse Management System" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📦 Master Barang</h1>
                        <p className="text-gray-600 mt-1">Kelola data barang dalam gudang</p>
                    </div>
                    <Link href="/items/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <span className="mr-2">➕</span>
                            Tambah Barang
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Barang</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{items.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Barang Aktif</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {items.data.filter(item => item.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Stok Menipis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {items.data.filter(item => item.is_low_stock).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Kategori</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                {categories.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Items Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Barang</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {items.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Kode</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Nama Barang</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Kategori</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Tipe</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Stok</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Harga Beli</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Status</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.data.map((item) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-2">
                                                    <span className="font-mono text-sm">{item.code}</span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-500">{item.vendor.company}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="text-sm">{item.category.name}</span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={getTypeBadge(item.type)}>
                                                        {item.type === 'consumable' ? 'Habis Pakai' :
                                                         item.type === 'asset' ? 'Aset' : 'Spare Part'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="flex items-center">
                                                        <span className={`font-medium ${item.is_low_stock ? 'text-red-600' : 'text-green-600'}`}>
                                                            {item.current_stock}
                                                        </span>
                                                        <span className="text-gray-500 text-sm ml-1">
                                                            {item.unit}
                                                        </span>
                                                        {item.is_low_stock && (
                                                            <span className="ml-2 text-red-500">⚠️</span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        Min: {item.minimum_stock} {item.unit}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="text-sm font-medium">
                                                        {formatPrice(item.purchase_price)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={getStatusBadge(item.status)}>
                                                        {item.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="flex space-x-2">
                                                        <Link href={`/items/${item.id}`}>
                                                            <Button size="sm" variant="outline">
                                                                👁️ Detail
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/items/${item.id}/edit`}>
                                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                                ✏️ Edit
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada barang</h3>
                                <p className="text-gray-500 mb-6">Mulai dengan menambahkan barang pertama Anda</p>
                                <Link href="/items/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <span className="mr-2">➕</span>
                                        Tambah Barang
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {items.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: items.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/items?page=${page}`}
                                className={`px-3 py-2 text-sm rounded ${
                                    page === items.current_page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}