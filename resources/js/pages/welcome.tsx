import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';



export default function Welcome() {
    return (
        <>
            <Head title="Warehouse Management System - PT Ultra Media Teknologi" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                {/* Header */}
                <header className="relative px-6 py-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">📦</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">WarehouseMS</h1>
                                <p className="text-sm text-gray-600">PT Ultra Media Teknologi</p>
                            </div>
                        </div>
                        
                        <div className="flex space-x-4">
                            <Link href="/login">
                                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                    Masuk
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            🏭 Sistem Manajemen Gudang
                            <span className="block text-blue-600 mt-2">Terdepan & Terpercaya</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Kelola inventori, tracking barang masuk-keluar, monitoring stok real-time, 
                            dan laporan komprehensif dengan antarmuka yang intuitif dan modern.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link href="/login">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                                    🚀 Mulai Sekarang
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                                📖 Pelajari Lebih Lanjut
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                                <div className="text-3xl text-blue-600 mb-2">⚡</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Real-time</h3>
                                <p className="text-gray-600">Monitoring stok dan transaksi secara langsung</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                                <div className="text-3xl text-blue-600 mb-2">📊</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Reports</h3>
                                <p className="text-gray-600">Laporan lengkap dengan export PDF & Excel</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                                <div className="text-3xl text-blue-600 mb-2">🔒</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Role Based</h3>
                                <p className="text-gray-600">Akses terkontrol berdasarkan peran pengguna</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white py-16">
                    <div className="container mx-auto px-6">
                        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            ✨ Fitur Unggulan
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                            <div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                                    📋 Master Data Lengkap
                                </h4>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">✓</span>
                                        Manajemen barang dengan kode unik, kategori, dan vendor
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">✓</span>
                                        Database vendor dengan rating dan kontak detail
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">✓</span>
                                        Kategorisasi barang untuk organisasi yang lebih baik
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">✓</span>
                                        Tracking harga beli dan jual untuk analisis margin
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                                <div className="text-6xl text-blue-600 mb-4 text-center">📦</div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">10,000+</div>
                                    <div className="text-gray-600">Items Managed</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 order-2 lg:order-1">
                                <div className="text-6xl text-green-600 mb-4 text-center">📈</div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">Real-time</div>
                                    <div className="text-gray-600">Stock Monitoring</div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                                    🔄 Transaksi & Monitoring
                                </h4>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Pencatatan barang masuk dan keluar otomatis
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Alert stok menipis berdasarkan minimum stock
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        History transaksi lengkap dengan audit trail
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Dashboard visual dengan chart dan statistik
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                                    👥 Multi-Role Access
                                </h4>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-purple-600 mr-2">👑</span>
                                        <strong>Admin:</strong> Kontrol penuh sistem dan user management
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-600 mr-2">📦</span>
                                        <strong>Staff Gudang:</strong> Input transaksi masuk dan keluar
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-600 mr-2">💰</span>
                                        <strong>Purchasing:</strong> Kelola vendor dan kebutuhan barang
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-600 mr-2">📊</span>
                                        <strong>Finance:</strong> Monitor harga dan laporan keuangan
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-600 mr-2">👤</span>
                                        <strong>User Biasa:</strong> Request barang dan cek stok
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
                                <div className="text-6xl text-purple-600 mb-4 text-center">👥</div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">5 Roles</div>
                                    <div className="text-gray-600">Access Control</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h3 className="text-3xl font-bold text-white mb-4">
                            🎯 Siap untuk Mengoptimalkan Gudang Anda?
                        </h3>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan PT Ultra Media Teknologi dan rasakan efisiensi 
                            pengelolaan gudang dengan teknologi terdepan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                                    🚀 Mulai Gratis Sekarang
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-500 px-8 py-3 text-lg">
                                📞 Hubungi Sales
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-12">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">📦</span>
                                    </div>
                                    <span className="text-white font-bold text-lg">WarehouseMS</span>
                                </div>
                                <p className="text-gray-400">
                                    Solusi manajemen gudang terdepan untuk PT Ultra Media Teknologi.
                                </p>
                            </div>
                            <div>
                                <h5 className="text-white font-semibold mb-4">Fitur</h5>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Master Data</li>
                                    <li>Transaksi Stok</li>
                                    <li>Monitoring Real-time</li>
                                    <li>Laporan Lengkap</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-white font-semibold mb-4">Kontak</h5>
                                <ul className="space-y-2 text-gray-400">
                                    <li>📧 info@ultramedtek.com</li>
                                    <li>📞 +62-21-12345678</li>
                                    <li>📍 Jakarta, Indonesia</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                            <p className="text-gray-400">
                                © 2024 PT Ultra Media Teknologi. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}