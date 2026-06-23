import { router } from '@inertiajs/react';
import { ShoppingCart, Plus, Minus, X, Info } from 'lucide-react';
import { useState } from 'react';

export default function CartSidebar({ cart, onClose }) {
    const cartItems = Object.values(cart || {});

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const handleCheckout = () => {
        if (!customerName || !phone) {
            alert('Nama dan nomor WhatsApp harus diisi!');
            return;
        }

        router.post('/checkout', {
            customer_name: customerName,
            phone: phone,
            payment_method: paymentMethod,
        }, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <div className="fixed right-0 top-0 h-screen w-full max-w-[440px] bg-slate-950 text-white shadow-2xl z-50 p-6 flex flex-col justify-between border-l border-slate-900 overflow-y-auto">
            <div>
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-5">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-wide">Keranjang</h2>
                        <p className="text-slate-400 text-xs font-semibold mt-0.5">Rincian pesanan Anda</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white p-2 hover:bg-slate-900 rounded-xl transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* SELF PICK-UP INFO BANNER */}
                <div className="mt-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex gap-3 items-start">
                    <Info className="text-orange-500 shrink-0 mt-0.5" size={18} />
                    <div>
                        <p className="text-orange-500 font-black text-xs uppercase tracking-wider">Metode: Ambil di Booth</p>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                            Pesanan diproses secara online dan diambil langsung di booth kami. Tunjukkan nomor WhatsApp Anda saat pengambilan.
                        </p>
                    </div>
                </div>

                {/* ITEMS */}
                <div className="mt-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 space-y-4">
                            <div className="w-32 h-32 bg-slate-900/40 rounded-full flex items-center justify-center border border-slate-900">
                                <img
                                    src="/images/fox_mascot.png"
                                    alt="Empty Cart Mascot"
                                    className="w-24 h-24 object-contain opacity-55 animate-bounce"
                                />
                            </div>
                            <p className="text-slate-500 font-black text-sm">Keranjang masih kosong</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 bg-slate-900 border border-slate-850 rounded-2xl p-3.5 items-center"
                            >
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950/60 shrink-0 border border-slate-800">
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src="/images/fox_mascot.png"
                                            className="w-10 h-10 object-contain mx-auto mt-3 opacity-40"
                                        />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-bold text-sm truncate">
                                        {item.name}
                                    </h3>

                                    <p className="text-orange-500 font-bold text-xs mt-0.5">
                                        Rp {Number(item.price).toLocaleString('id-ID')}
                                    </p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() =>
                                                router.post(
                                                    `/cart/decrease/${item.id}`,
                                                    {},
                                                    { preserveScroll: true }
                                                )
                                            }
                                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 w-7 h-7 rounded-lg flex items-center justify-center transition"
                                        >
                                            <Minus size={14} />
                                        </button>

                                        <span className="text-white font-black text-sm w-4 text-center">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                router.post(
                                                    `/cart/add/${item.id}`,
                                                    {},
                                                    {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                    }
                                                )
                                            }
                                            className="bg-orange-500 hover:bg-orange-600 text-white w-7 h-7 rounded-lg flex items-center justify-center transition"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* TOTAL & CHECKOUT FORM */}
            {cartItems.length > 0 && (
                <div className="mt-8 border-t border-slate-900 pt-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <p className="text-slate-400 font-bold text-sm">Total Belanja</p>
                        <h3 className="text-2xl font-black text-orange-500">
                            Rp {total.toLocaleString('id-ID')}
                        </h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
                            <input
                                type="text"
                                placeholder="Masukkan nama Anda"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm mt-1.5 focus:outline-none focus:border-orange-500/50 transition"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nomor WhatsApp</label>
                            <input
                                type="text"
                                placeholder="Contoh: 081234567890"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm mt-1.5 focus:outline-none focus:border-orange-500/50 transition"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metode Pembayaran</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm mt-1.5 focus:outline-none focus:border-orange-500/50 transition cursor-pointer"
                            >
                                <option value="cash">Bayar Tunai di Booth (Cash)</option>
                                <option value="qris">Scan QRIS di Booth (QRIS)</option>
                            </select>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-4 rounded-2xl text-white font-black text-md shadow-lg shadow-orange-500/20 active:scale-[0.98] mt-3"
                        >
                            Konfirmasi Pesanan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
