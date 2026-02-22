"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/app/lib/config";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, itemsCount } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
    };

    const handleWhatsAppCheckout = () => {
        const phoneNumber = SITE_CONFIG.whatsappNumber;

        // Tracking Facebook Pixel
        if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq('track', 'InitiateCheckout', {
                content_ids: cart.map(item => item.id),
                content_type: 'product',
                value: totalPrice,
                currency: 'XOF',
                num_items: itemsCount
            });
        }

        let message = `Bonjour ${SITE_CONFIG.name} ! 👑\n\nJe souhaite passer commande pour les articles suivants :\n\n`;

        cart.forEach((item) => {
            message += `• ${item.name} (x${item.quantity}) - ${item.price}\n`;
        });

        message += `\n*TOTAL : ${formatPrice(totalPrice)}*`;
        message += "\n\nMerci de me confirmer la disponibilité ! ✨";

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    };

    if (itemsCount === 0) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-20 px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="h-24 w-24 rounded-full bg-mina-gold/5 flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-mina-gold opacity-30">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-light text-mina-onyx mb-6">Votre panier est vide</h1>
                    <p className="text-mina-onyx/50 mb-12 max-w-md mx-auto leading-relaxed">
                        Votre sélection royale vous attend. Explorez nos collections et trouvez la pièce qui révélera votre éclat.
                    </p>
                    <Link href="/" className="inline-block bg-mina-onyx text-white px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-mina-gold transition-all">
                        Découvrir la Collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background selection:bg-mina-gold selection:text-white pb-32">
            {/* Mini Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 glass">
                <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
                    <Link href="/" className="flex flex-col items-center">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-mina-gold/20">
                            <Image src="/logo_mina_glamour.jpg" alt="Logo" fill className="object-cover" />
                        </div>
                    </Link>
                    <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-mina-onyx hover:text-mina-gold transition-colors">
                        ← Continuer le shopping
                    </Link>
                </nav>
            </header>

            <main className="mx-auto max-w-5xl px-6 pt-32 md:px-8">
                <div className="mb-12 border-b border-mina-onyx/5 pb-8">
                    <h1 className="font-serif text-4xl md:text-6xl font-light text-mina-onyx mb-4">Mon Panier</h1>
                    <p className="text-xs uppercase tracking-widest text-mina-gold font-bold">{itemsCount} articles sélectionnés</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Items List */}
                    <div className="lg:col-span-7 space-y-8">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-6 pb-8 border-b border-mina-onyx/5 group">
                                <div className="relative aspect-[3/4] w-24 overflow-hidden rounded-lg bg-zinc-50 flex-shrink-0 border border-mina-onyx/5">
                                    {item.image && (
                                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    )}
                                </div>
                                <div className="flex flex-col flex-grow justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-serif text-xl text-mina-onyx leading-tight" dangerouslySetInnerHTML={{ __html: item.name }}></h3>
                                            <button onClick={() => removeFromCart(item.id)} className="text-mina-onyx/30 hover:text-red-600 transition-colors">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                        <p className="font-sans font-black text-mina-gold mb-4">{item.price}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-mina-onyx/10 rounded-full bg-white px-3 py-1 scale-90 origin-left">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-mina-onyx/40 hover:text-mina-onyx">-</button>
                                            <span className="w-8 text-center text-xs font-bold font-sans">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-mina-onyx/40 hover:text-mina-onyx">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 rounded-2xl bg-mina-onyx p-8 text-white shadow-2xl">
                            <h2 className="font-serif text-2xl mb-8 border-b border-white/10 pb-6 uppercase tracking-widest">Résumé</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm text-white/60">
                                    <span>Sous-total ({itemsCount} articles)</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-white/60">
                                    <span>Livraison (Dakar & Banlieue)</span>
                                    <span className="italic">Calculée à la livraison</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 mb-10">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs uppercase tracking-widest font-bold text-mina-gold">Total estimé</span>
                                    <span className="text-3xl font-sans font-black">{formatPrice(totalPrice)}</span>
                                </div>
                                <p className="text-[10px] text-white/40 italic">Règlement final via WhatsApp avec nos conseillers.</p>
                            </div>

                            <button
                                onClick={handleWhatsAppCheckout}
                                className="w-full bg-mina-gold text-white rounded-full py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-mina-onyx transition-all shadow-xl flex items-center justify-center gap-3 group"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-2.135 0-4.148 1.287-5.122 3.308-1.2 2.485-.295 5.485 2.067 6.963l.114.072-.456 1.667 1.706-.448.106.063c1.393.834 3.167.971 4.673.344 1.505-.628 2.583-2.022 2.825-3.647.243-1.625-.386-3.235-1.644-4.212-1.258-.977-2.828-1.449-4.269-1.449zm5.341 7.221c-.139.734-.634 1.341-1.314 1.616-.68.275-1.455.196-2.062-.211l-.224-.15-.71.186.19-.694-.145-.091c-.815-.512-1.253-1.474-.993-2.404.26-.93.99-1.603 1.932-1.782.943-.178 1.889.155 2.515.882.627.727.818 1.739.811 2.654z" /></svg>
                                Passer Commande WhatsApp
                            </button>

                            <div className="mt-8 flex items-center justify-center gap-2 opacity-30 group cursor-default">
                                <span className="h-[1px] w-8 bg-white/50"></span>
                                <span className="text-[10px] uppercase tracking-widest font-bold">Mina Glamour Premium</span>
                                <span className="h-[1px] w-8 bg-white/50"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
