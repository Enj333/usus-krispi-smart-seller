export default function Navbar({ openCart, cartCount }) {
    return (
        <nav className="flex justify-between items-center px-8 py-6">
            <h1 className="text-3xl font-black text-orange-500">PURI SAJI</h1>

            <button
                onClick={openCart}
                className="bg-orange-500 px-5 py-2 rounded-full text-white font-bold"
            >
                Cart ({cartCount})
            </button>
        </nav>
    );
}
