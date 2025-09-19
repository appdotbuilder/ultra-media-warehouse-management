import React from 'react';
import AppLayout from '@/components/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardStats {
    total_items: number;
    total_vendors: number;
    total_categories: number;
    low_stock_items: number;
}

interface Transaction {
    id: number;
    transaction_code: string;
    type: 'in' | 'out';
    quantity: number;
    transaction_date: string;
    item: {
        name: string;
        code: string;
    };
    user: {
        name: string;
    };
}

interface StockRequest {
    id: number;
    request_code: string;
    requested_quantity: number;
    status: string;
    request_date: string;
    item: {
        name: string;
        code: string;
    };
    requested_by: {
        name: string;
    };
}

interface LowStockItem {
    id: number;
    name: string;
    code: string;
    current_stock: number;
    minimum_stock: number;
    category: {
        name: string;
    };
    vendor: {
        name: string;
    };
}

interface Props {
    statistics: DashboardStats;
    recent_transactions: Transaction[];
    pending_requests: StockRequest[];
    low_stock_items_detail: LowStockItem[];
    [key: string]: unknown;
}

export default function Dashboard({ 
    statistics, 
    recent_transactions, 
    pending_requests, 
    low_stock_items_detail 
}: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout>
            <Head title="Dashboard - Warehouse Management System" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>
                        <p className="text-gray-600 mt-1">Selamat datang di Sistem Manajemen Gudang PT Ultra Media Teknologi</p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Total Barang</CardTitle>
                            <div className="text-2xl text-blue-600">📦</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">{statistics.total_items}</div>
                            <p className="text-xs text-blue-600 mt-1">Item aktif dalam sistem</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">Total Vendor</CardTitle>
                            <div className="text-2xl text-green-600">🏢</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">{statistics.total_vendors}</div>
                            <p className="text-xs text-green-600 mt-1">Vendor aktif terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700">Kategori</CardTitle>
                            <div className="text-2xl text-purple-600">📋</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900">{statistics.total_categories}</div>
                            <p className="text-xs text-purple-600 mt-1">Kategori barang</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-red-700">Stok Menipis</CardTitle>
                            <div className="text-2xl text-red-600">⚠️</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-900">{statistics.low_stock_items}</div>
                            <p className="text-xs text-red-600 mt-1">Perlu segera diisi ulang</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <span className="mr-2">⚡</span>
                            Aksi Cepat
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/items/create">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    <span className="mr-2">➕</span>
                                    Tambah Barang
                                </Button>
                            </Link>
                            <Link href="/stock-transactions/create">
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    <span className="mr-2">📥</span>
                                    Transaksi Stok
                                </Button>
                            </Link>
                            <Link href="/vendors/create">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    <span className="mr-2">🏢</span>
                                    Tambah Vendor
                                </Button>
                            </Link>
                            <Link href="/reports">
                                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                    <span className="mr-2">📊</span>
                                    Lihat Laporan
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Transactions */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center">
                                <span className="mr-2">🔄</span>
                                Transaksi Terbaru
                            </CardTitle>
                            <Link href="/stock-transactions">
                                <Button variant="outline" size="sm">Lihat Semua</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {recent_transactions.length > 0 ? (
                                <div className="space-y-3">
                                    {recent_transactions.slice(0, 5).map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    transaction.type === 'in' 
                                                        ? 'bg-green-100 text-green-600' 
                                                        : 'bg-red-100 text-red-600'
                                                }`}>
                                                    {transaction.type === 'in' ? '📥' : '📤'}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{transaction.item.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {transaction.transaction_code} • {transaction.user.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-sm">{transaction.quantity}</p>
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(transaction.transaction_date)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">📭</div>
                                    <p>Belum ada transaksi terbaru</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pending Requests */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center">
                                <span className="mr-2">⏳</span>
                                Permintaan Pending
                            </CardTitle>
                            <Link href="/stock-requests">
                                <Button variant="outline" size="sm">Lihat Semua</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {pending_requests.length > 0 ? (
                                <div className="space-y-3">
                                    {pending_requests.slice(0, 5).map((request) => (
                                        <div key={request.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                                                    🛎️
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{request.item.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {request.request_code} • {request.requested_by.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-sm">{request.requested_quantity}</p>
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(request.request_date)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">✅</div>
                                    <p>Tidak ada permintaan pending</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Low Stock Alert */}
                {low_stock_items_detail.length > 0 && (
                    <Card className="border-red-200 bg-red-50">
                        <CardHeader>
                            <CardTitle className="flex items-center text-red-700">
                                <span className="mr-2">🚨</span>
                                Peringatan Stok Menipis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {low_stock_items_detail.map((item) => (
                                    <div key={item.id} className="bg-white p-4 rounded-lg border border-red-200">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-medium text-sm text-gray-900">{item.name}</h4>
                                                <p className="text-xs text-gray-500">{item.code} • {item.category.name}</p>
                                            </div>
                                            <div className="text-red-600">⚠️</div>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Stok saat ini:</span>
                                            <span className="font-medium text-red-600">{item.current_stock}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Minimum stok:</span>
                                            <span className="font-medium">{item.minimum_stock}</span>
                                        </div>
                                        <div className="mt-3">
                                            <Link href={`/items/${item.id}`}>
                                                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                                                    Lihat Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}