import { router } from '@inertiajs/react';

export default function ProductCard({ product }) {
    return (
        <div className="bg-zinc-900 rounded-3xl overflow-hidden">
            <img
                src={`/storage/${product.image}`}
                className="w-full h-52 object-cover"
                alt={product.name}
            />

            <div className="p-5">
                <h3 className="text-xl font-bold">{product.name}</h3>

                <p className="text-zinc-400 mt-2">{product.description}</p>

                <div className="flex justify-between items-center mt-5">
                    <span className="text-orange-500 font-bold">
                        Rp {product.price.toLocaleString()}
                    </span>

                    <button
                        onClick={() =>
                            router.post(
                                `/cart/add/${product.id}`,
                                {},
                                {
                                    preserveScroll: true,
                                    preserveState: true,
                                }
                            )
                        }
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
