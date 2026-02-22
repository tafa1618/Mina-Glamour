"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
    product: any;
    showIconOnly?: boolean;
}

export default function AddToCartButton({ product, showIconOnly = false }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart(product);

        // Tracking Facebook Pixel
        if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq('track', 'AddToCart', {
                content_name: product.name,
                content_ids: [product.id],
                content_type: 'product',
                value: parseFloat(product.price.replace(/[^0-9.]/g, "")),
                currency: 'XOF'
            });
        }

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    if (showIconOnly) {
        return (
            <button
                onClick={handleAdd}
                className={`h-8 w-8 rounded-full border border-mina-onyx/10 flex items-center justify-center transition-all ${isAdding ? "bg-mina-gold border-mina-gold text-white" : "hover:bg-mina-onyx hover:text-white"
                    }`}
            >
                {isAdding ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                )}
            </button>
        );
    }

    return (
        <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`group relative flex w-full items-center justify-center overflow-hidden rounded-full py-4 transition-all duration-500 md:py-5 ${isAdding ? "bg-mina-gold" : "bg-mina-onyx hover:bg-mina-gold"
                }`}
        >
            <div className={`flex items-center gap-3 transition-transform duration-500 ${isAdding ? "translate-y-12" : "translate-y-0"}`}>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:rotate-12 transition-transform"
                >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
                    Ajouter au Panier
                </span>
            </div>

            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${isAdding ? "translate-y-0" : "-translate-y-12"}`}>
                <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
                        Produit Ajouté
                    </span>
                </div>
            </div>
        </button>
    );
}
