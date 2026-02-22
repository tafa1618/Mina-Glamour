"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: { src: string }[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-50 border border-mina-onyx/5 flex items-center justify-center italic opacity-20">
                Image non disponible
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-50 border border-mina-onyx/5">
                <Image
                    src={images[activeImageIndex].src}
                    alt={productName}
                    fill
                    className="object-cover transition-all duration-700"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4 mt-6">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${activeImageIndex === idx ? "border-mina-gold shadow-md" : "border-mina-onyx/5 grayscale-[0.5] hover:grayscale-0 hover:border-mina-gold/30"
                                }`}
                        >
                            <Image src={img.src} alt={`${productName} - ${idx}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
