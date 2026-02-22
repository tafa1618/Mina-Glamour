"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
    const { itemsCount } = useCart();

    return (
        <Link href="/cart" className="relative text-foreground/70 transition-colors hover:text-mina-gold hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-mina-gold text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce shadow-lg">
                    {itemsCount}
                </span>
            )}
        </Link>
    );
}
