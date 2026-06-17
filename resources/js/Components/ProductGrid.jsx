import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
    return (
        <section className="container mx-auto px-6 py-20">
            <div className="mb-10">
                <h2 className="text-5xl font-black text-white">Menu Favorit</h2>

                <p className="text-zinc-400 mt-3 text-lg">
                    Pilihan cemilan paling laris hari ini
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
