import Link from "next/link";
import Image from "next/image";
import { fetchWC } from "../../lib/api";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Step 1: Resolve slug → category ID
    const categories = await fetchWC(`products/categories?slug=${slug}`);
    if (!categories || categories.length === 0) notFound();
    const category = categories[0];

    // Step 2: Fetch products in this category
    const products = await fetchWC(`products?category=${category.id}&per_page=20&status=publish`);

    const formatPrice = (price: string) => {
        if (!price) return "Sur demande";
        const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));
        return new Intl.NumberFormat("fr-FR").format(numeric) + " FCFA";
    };

    return (
        <div className="min-h-screen bg-background selection:bg-mina-gold selection:text-white">
            {/* Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 glass">
                <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
                    <Link href="/">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-mina-gold/20">
                            <Image src="/logo_mina_glamour.jpg" alt="Logo" fill className="object-cover" />
                        </div>
                    </Link>
                    <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-mina-onyx hover:text-mina-gold transition-colors">
                        ← Retour à la boutique
                    </Link>
                </nav>
            </header>

            <main className="mx-auto max-w-7xl px-6 pt-28 pb-20 md:px-8 lg:pt-36">
                {/* Category Header */}
                <div className="mb-16 text-center">
                    <span className="text-mina-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">
                        Collection
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl font-light text-mina-onyx mb-4">
                        {category.name}
                    </h1>
                    <div className="mx-auto mt-4 h-[1px] w-20 bg-mina-gold/30 mb-6"></div>
                    <p className="text-sm text-mina-onyx/50 uppercase tracking-widest">
                        {category.count} {category.count === 1 ? "article" : "articles"}
                    </p>
                </div>

                {/* Products Grid */}
                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product: any) => (
                            <Link key={product.id} href={`/product/${product.id}`} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50 mb-6 rounded-xl border border-mina-onyx/5">
                                    {product.images && product.images[0] ? (
                                        <Image
                                            src={product.images[0].src}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-all duration-1000"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-mina-onyx/5">
                                            <span className="font-serif text-lg italic opacity-20 text-center px-4">{product.name}</span>
                                        </div>
                                    )}
                                    {product.on_sale && (
                                        <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white rounded-full">Offre Royale</div>
                                    )}
                                </div>
                                <h3 className="font-serif text-xl mb-2 text-mina-onyx group-hover:text-mina-gold transition-colors" dangerouslySetInnerHTML={{ __html: product.name }}></h3>
                                <div className="text-[10px] uppercase tracking-[0.1em] opacity-40 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}></div>
                                <div className="flex items-center justify-between border-t border-mina-onyx/5 pt-4">
                                    <p className="font-sans font-black text-mina-gold text-lg">{formatPrice(product.price)}</p>
                                    <div className="h-8 w-8 rounded-full border border-mina-onyx/10 flex items-center justify-center group-hover:bg-mina-onyx group-hover:text-white transition-all">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 opacity-30 italic font-serif text-2xl">
                        Cette collection arrive bientôt...
                    </div>
                )}
            </main>
        </div>
    );
}
