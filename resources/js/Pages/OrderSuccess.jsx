import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, QrCode, ArrowLeft, Landmark, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';

export default function OrderSuccess({ order }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSimulatePayment = () => {
        setIsLoading(true);
        router.post(
            `/order/${order.id}/simulate-payment`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 md:p-6 selection:bg-orange-500">
            <Head title="Pesanan Berhasil" />

            {/* Glowing background details */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden z-10 space-y-8">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* HEADER / MASCOT */}
                <div className="text-center space-y-4">
                    <div className="w-32 h-32 bg-slate-950/60 rounded-full flex items-center justify-center p-3 border-2 border-orange-500 mx-auto shadow-lg relative">
                        <img
                            src="/images/fox_mascot.png"
                            alt="Fox Mascot Success"
                            className="w-full h-full object-contain"
                        />
                        {order.payment_status === 'lunas' ? (
                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-4 border-slate-900 shadow-md">
                                <CheckCircle2 size={18} className="text-white" />
                            </div>
                        ) : (
                            <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1.5 border-4 border-slate-900 shadow-md animate-pulse">
                                <Clock size={18} className="text-white" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-white tracking-wide">
                            {order.payment_status === 'lunas' ? 'Pesanan Berhasil!' : 'Selesaikan Pembayaran'}
                        </h1>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                            ID PESANAN: #PESANAN-{order.id}
                        </p>
                    </div>
                </div>

                {/* DETAILS CARD */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-inner">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-950 pb-2">
                        📋 Detail Pengambilan
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                        <div>
                            <p className="text-slate-500 text-xs uppercase tracking-wider">Nama Pembeli</p>
                            <p className="text-white mt-0.5">{order.customer_name}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs uppercase tracking-wider">No. WhatsApp</p>
                            <p className="text-white mt-0.5">{order.phone || '-'}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs uppercase tracking-wider">Waktu Pemesanan</p>
                            <p className="text-white mt-0.5">
                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs uppercase tracking-wider">Status Pesanan</p>
                            <span className={`inline-block mt-1 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                                order.status === 'pending'
                                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                    : order.status === 'diproses'
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    : order.status === 'selesai'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ITEMS LIST */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-inner">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-950 pb-2">
                        🛒 Rincian Belanja
                    </h3>
                    <div className="space-y-3">
                        {order.order_items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="min-w-0 flex-1 pr-4">
                                    <p className="text-white font-bold truncate">{item.product.name}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">
                                        Rp {Number(item.price).toLocaleString('id-ID')} x {item.quantity}
                                    </p>
                                </div>
                                <span className="text-white font-bold shrink-0">
                                    Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-950 pt-4">
                        <span className="text-slate-400 font-bold text-sm">Total Pembayaran</span>
                        <span className="text-xl font-black text-orange-500">
                            Rp {Number(order.total_price).toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>

                {/* PAYMENT SECTION */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-3xl p-6 space-y-5 shadow-inner">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-950 pb-2">
                        💳 Status & Metode Pembayaran
                    </h3>

                    {order.payment_method === 'qris' ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <QrCode size={18} className="text-orange-500" />
                                    <span className="text-sm font-bold text-white">QRIS (Scan Barcode)</span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                    order.payment_status === 'lunas'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                }`}>
                                    {order.payment_status === 'lunas' ? 'LUNAS' : 'BELUM BAYAR'}
                                </span>
                            </div>

                            {order.payment_status === 'belum_bayar' ? (
                                <div className="flex flex-col items-center gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-850">
                                    <p className="text-xs text-slate-400 text-center leading-relaxed">
                                        Scan QRIS di bawah ini, kemudian tekan tombol simulasi pembayaran.
                                    </p>
                                    <div className="w-48 h-48 bg-white rounded-2xl p-3 shadow-lg flex items-center justify-center border border-slate-850">
                                        <img
                                            src="/images/mock_qris.png"
                                            alt="Mock QRIS QR Code"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* SIMULATION ACTION BUTTON */}
                                    <button
                                        onClick={handleSimulatePayment}
                                        disabled={isLoading}
                                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 py-3.5 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            '⚡ Konfirmasi Pembayaran (Simulasi)'
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center space-y-2">
                                    <div className="flex justify-center text-emerald-400">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <p className="text-emerald-400 font-black text-base">Pembayaran Terverifikasi!</p>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        Terima kasih. Pesanan Anda sedang dipersiapkan di booth. Tunjukkan ID pesanan ini saat melakukan pengambilan.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Landmark size={18} className="text-orange-500" />
                                    <span className="text-sm font-bold text-white">Bayar Tunai di Booth (Cash)</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    BAYAR DI TEMPAT
                                </span>
                            </div>
                            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-850 text-center">
                                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                                    Silakan lakukan pembayaran tunai sebesar <span className="text-orange-500 font-black">Rp {Number(order.total_price).toLocaleString('id-ID')}</span> saat Anda mengambil pesanan di booth kami.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER ACTIONS */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/"
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold py-4 rounded-2xl text-center text-sm border border-slate-800 flex items-center justify-center gap-2 transition"
                    >
                        <ArrowLeft size={16} />
                        Kembali Belanja
                    </Link>

                    <a
                        href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP || '6281234567890'}?text=Halo%20Admin,%20saya%20ingin%20mengonfirmasi%20preorder%20Usus%20Krispi%20dengan%20ID%20%23PESANAN-${order.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-center text-sm flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/10"
                    >
                        <MessageSquare size={16} />
                        Hubungi Admin WA
                    </a>
                </div>
            </div>
        </main>
    );
}
