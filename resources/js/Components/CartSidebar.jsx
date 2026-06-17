import { router } from '@inertiajs/react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
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
        });
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 w-[340px] bg-zinc-900 border border-zinc-800 rounded-[35px] p-6 shadow-2xl z-50">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white text-xl"
            >
                ✕
            </button>
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-white">Cart</h2>

                    <p className="text-zinc-400 text-sm">Pesanan kamu</p>
                </div>

                <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <ShoppingCart className="text-white" />
                </div>
            </div>

            {/* ITEMS */}
            <div className="mt-8 space-y-5">
                {cartItems.length === 0 ? (
                    <div className="text-center py-10 text-zinc-400">
                        Cart masih kosong
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 bg-zinc-800 rounded-2xl p-3"
                        >
                            <img
                                src={`/storage/${item.image}`}
                                alt={item.name}
                                className="w-20 h-20 rounded-2xl object-cover"
                            />

                            <div className="flex-1">
                                <h3 className="text-white font-bold">
                                    {item.name}
                                </h3>

                                <p className="text-orange-400 mt-1">
                                    Rp{' '}
                                    {Number(item.price).toLocaleString('id-ID')}
                                </p>

                                <div className="flex items-center gap-3 mt-3">
                                    <button
                                        onClick={() =>
                                            router.post(
                                                `/cart/decrease/${item.id}`
                                            )
                                        }
                                        className="bg-zinc-700 w-8 h-8 rounded-full flex items-center justify-center"
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <span className="text-white">
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
                                        className="bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* TOTAL */}
            <div className="mt-8 border-t border-zinc-800 pt-6">
                <div className="flex justify-between items-center">
                    <p className="text-zinc-400">Total</p>

                    <h3 className="text-3xl font-black text-white">
                        Rp {total.toLocaleString('id-ID')}
                    </h3>
                </div>

                <div className="mt-5 space-y-3">
                    <input
                        type="text"
                        placeholder="Nama"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white"
                    />

                    <input
                        type="text"
                        placeholder="Nomor WhatsApp"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white"
                    />

                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white"
                    >
                        <option value="cash">Cash</option>
                        <option value="qris">QRIS</option>
                    </select>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-full text-white font-black text-lg"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
