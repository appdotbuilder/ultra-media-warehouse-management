import React from 'react';
import AppLayout from '@/components/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Item {
    id: number;
    code: string;
    name: string;
}

interface User {
    id: number;
    name: string;
}

interface StockTransaction {
    id: number;
    transaction_code: string;
    type: 'in' | 'out';
    quantity: number;
    unit_price: number;
    total_amount: number;
    stock_before: number;
    stock_after: number;
    notes?: string;
    document_reference?: string;
    transaction_date: string;
    item: Item;
    user: User;
}

interface TransactionsData {
    data: StockTransaction[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    transactions: TransactionsData;
    items: Item[];
    filters: {
        search?: string;
        type?: string;
        item_id?: string;
        date_from?: string;
        date_to?: string;
    };
    [key: string]: unknown;
}

export default function StockTransactionsIndex({ transactions }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getTransactionTypeBadge = (type: 'in' | 'out') => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full flex items-center w-fit";
        if (type === 'in') {
            return `${baseClasses} bg-green-100 text-green-700`;
        }
        return `${baseClasses} bg-red-100 text-red-700`;
    };

    return (
        <AppLayout>
            <Head title="Transaksi Stok - Warehouse Management System" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🔄 Transaksi Stok</h1>
                        <p className="text-gray-600 mt-1">Kelola transaksi barang masuk dan keluar</p>
                    </div>
                    <Link href="/stock-transactions/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <span className="mr-2">➕</span>
                            Tambah Transaksi
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Transaksi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{transactions.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Barang Masuk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {transactions.data.filter(t => t.type === 'in').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Barang Keluar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {transactions.data.filter(t => t.type === 'out').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Nilai</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold text-blue-600">
                                {formatPrice(transactions.data.reduce((sum, t) => sum + t.total_amount, 0))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {transactions.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Kode Transaksi</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Barang</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Tipe</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Jumlah</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Harga Satuan</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Total</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Tanggal</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Petugas</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-700">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.data.map((transaction) => (
                                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-2">
                                                    <span className="font-mono text-sm font-medium">
                                                        {transaction.transaction_code}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div>
                                                        <p className="font-medium text-sm">{transaction.item.name}</p>
                                                        <p className="text-xs text-gray-500">{transaction.item.code}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={getTransactionTypeBadge(transaction.type)}>
                                                        <span className="mr-1">
                                                            {transaction.type === 'in' ? '📥' : '📤'}
                                                        </span>
                                                        {transaction.type === 'in' ? 'Masuk' : 'Keluar'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="font-medium">{transaction.quantity}</span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="text-sm">
                                                        {formatPrice(transaction.unit_price)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="font-medium">
                                                        {formatPrice(transaction.total_amount)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="text-sm">
                                                        {formatDate(transaction.transaction_date)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="text-sm">{transaction.user.name}</span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <Link href={`/stock-transactions/${transaction.id}`}>
                                                        <Button size="sm" variant="outline">
                                                            👁️ Detail
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔄</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada transaksi</h3>
                                <p className="text-gray-500 mb-6">Mulai dengan menambahkan transaksi stok pertama</p>
                                <Link href="/stock-transactions/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <span className="mr-2">➕</span>
                                        Tambah Transaksi
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {transactions.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: transactions.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/stock-transactions?page=${page}`}
                                className={`px-3 py-2 text-sm rounded ${
                                    page === transactions.current_page
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