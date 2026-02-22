import Link from "next/link";
import Image from "next/image";
import { fetchWC } from "../../lib/api";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import CartIcon from "@/components/CartIcon";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await fetchWC(`products/${id}`);

    if (!product || product.length === 0 || product.code === "rest_no_route" || product.code === "rest_post_invalid_id") {
        notFound();
    }

    const formatPrice = (price: string) => {
        if (!price) return "Sur demande";
        const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));
        return new Intl.NumberFormat("fr-FR").format(numeric) + " FCFA";
    };

    const images = product.images || [];

    return (
        <div className="min-h-screen bg-background selection:bg-mina-gold selection:text-white pb-20">
            {/* Mini Navigation for Product Page */}
            <header className="fixed top-0 left-0 right-0 z-50 glass">
                <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
                    <Link href="/" className="flex flex-col items-center">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-mina-gold/20">
                            <Image src="/logo_mina_glamour.jpg" alt="Logo" fill className="object-cover" />
                        </div>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-mina-onyx hover:text-mina-gold transition-colors">
                            ← Boutique
                        </Link>
                        <CartIcon />
                    </div>
                </nav>
            </header>

            <main className="mx-auto max-w-6xl px-6 pt-24 md:px-8 lg:pt-32">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">

                    {/* Product Gallery (Client Component) */}
                    <div className="lg:sticky lg:top-32">
                        <ProductGallery images={images} productName={product.name} />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <span className="text-mina-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
                                {product.categories?.[0]?.name || "Collection Exclusive"}
                            </span>
                            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-mina-onyx leading-tight mb-4" dangerouslySetInnerHTML={{ __html: product.name }}></h1>
                            <p className="font-sans font-black text-mina-gold text-2xl mb-6">
                                {formatPrice(product.price)}
                            </p>
                            <div className="h-[1px] w-full bg-mina-onyx/5 mb-6"></div>
                        </div>

                        <div className="space-y-6">
                            <div className="prose-description prose max-w-none leading-relaxed font-light text-base md:text-lg">
                                <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                            </div>

                            <div className="pt-6">
                                <button className="gold-gradient w-full py-4 text-white font-bold uppercase tracking-widest rounded-full shadow-xl hover:scale-[1.02] transition-transform active:scale-95">
                                    Ajouter au Panier Royale
                                </button>
                                <p className="text-center mt-4 text-[9px] uppercase tracking-widest opacity-40">
                                    Livraison Express en 24h sur Dakar 🇸🇳
                                </p>
                            </div>
                        </div>

                        {/* Product Features */}
                        <div className="mt-12 grid grid-cols-2 gap-4 pt-8 border-t border-mina-onyx/5">
                            <div>
                                <h4 className="text-[9px] font-bold uppercase tracking-widest text-mina-onyx mb-1 text-mina-gold">Authenticité</h4>
                                <p className="text-[11px] text-mina-onyx/50 leading-relaxed">Produits 100% originaux certifiés par Mina Glamour.</p>
                            </div>
                            <div>
                                <h4 className="text-[9px] font-bold uppercase tracking-widest text-mina-onyx mb-1 text-mina-gold">Paiement</h4>
                                <p className="text-[11px] text-mina-onyx/50 leading-relaxed">Sécurisé par Wave, Orange Money ou Espèces.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
