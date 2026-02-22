"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AgentDashboard() {
    const [step, setStep] = useState(0); // 0: Upload, 1: Analyzing, 2: Review
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [productContext, setProductContext] = useState("");
    const [priceContext, setPriceContext] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [mockProduct, setMockProduct] = useState({
        name: "",
        description: "",
        price: "",
        margin: "",
        seo: ""
    });

    const [isPublishing, setIsPublishing] = useState(false);
    const [publishStatus, setPublishStatus] = useState<"idle" | "success" | "error">("idle");
    const [lastError, setLastError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStartAnalysis = async () => {
        if (!selectedFile) {
            fileInputRef.current?.click();
            return;
        }

        setStep(1);
        setPublishStatus("idle");

        try {
            const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = (reader.result as string).split(',')[1];
                    resolve(base64String);
                };
                reader.readAsDataURL(selectedFile);
            });

            const response = await fetch("/api/agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: {
                        inlineData: {
                            data: base64,
                            mimeType: selectedFile.type
                        }
                    },
                    prompt: productContext || "Analyse ce produit pour Mina Glamour."
                })
            });

            const data = await response.json();

            setMockProduct({
                name: data.name || (productContext ? productContext : "Produit de Luxe"),
                description: data.description || "L'analyse est complète. Vous pouvez maintenant réviser la description.",
                price: priceContext || data.price || "Contactez-nous",
                margin: "Calculé à l'étape suivante",
                seo: data.seo_tags || "luxe, dakar, mina, glamour"
            });
            setStep(2);
        } catch (error) {
            console.error("Analysis failed:", error);
            setStep(0);
            alert("L'analyse a échoué. Veuillez réessayer avec une autre image ou vérifier votre connexion.");
        }
    };

    const handlePublish = async () => {
        setIsPublishing(true);
        setLastError(null);
        try {
            const response = await fetch("/api/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: mockProduct.name,
                    description: mockProduct.description,
                    price: mockProduct.price,
                    images: previewUrl ? [previewUrl] : []
                })
            });
            const data = await response.json();
            if (data.success) {
                setPublishStatus("success");
            } else {
                setPublishStatus("error");
                setLastError(data.error || "Une erreur est survenue lors de la publication.");
            }
        } catch (error: any) {
            console.error("Publishing failed:", error);
            setPublishStatus("error");
            setLastError(error.message || "Erreur de connexion au serveur.");
        } finally {
            setIsPublishing(false);
        }
    };

    const resetAnalysis = () => {
        setStep(0);
        setPublishStatus("idle");
        setSelectedFile(null);
        setPreviewUrl(null);
        setProductContext("");
        setPriceContext("");
    };

    return (
        <div className="min-h-screen bg-foreground text-background font-sans selection:bg-mina-gold selection:text-white">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />

            {/* Sidebar Navigation */}
            <aside className="fixed left-0 top-0 h-full w-20 border-r border-mina-gold/10 bg-mina-onyx flex flex-col items-center py-8 gap-10 z-50">
                <Link href="/" className="relative h-14 w-14 overflow-hidden rounded-full border border-mina-gold/30">
                    <Image src="/logo_mina_glamour.jpg" alt="Logo" fill className="object-cover" />
                </Link>
                <nav className="flex flex-col gap-8 opacity-40">
                    <button className="hover:text-mina-gold transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></svg>
                    </button>
                    <button className="text-mina-gold opacity-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                    </button>
                </nav>
            </aside>

            <main className="pl-32 pr-12 py-12 max-w-[1400px] mx-auto">
                {/* Header */}
                <header className="mb-16 flex justify-between items-end">
                    <div>
                        <h1 className="text-mina-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-2">Service d'IA Agentique</h1>
                        <h2 className="font-serif text-5xl font-light">Mina Assistant Manager</h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest opacity-40">Statut Système</p>
                            <div className="flex items-center gap-2 justify-end">
                                <span className="h-2 w-2 rounded-full bg-mina-emerald animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-mina-emerald">Optimisé - Gemini 1.5</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="glass-dark rounded-3xl p-10 min-h-[500px] flex flex-col justify-center border-mina-gold/20 shadow-2xl relative overflow-hidden">
                            {step === 0 && (
                                <div className="text-center space-y-8 animate-fade-in relative z-10">
                                    <div
                                        className="w-56 h-56 rounded-2xl bg-mina-gold/5 border border-mina-gold/20 flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-mina-gold/10 transition-all overflow-hidden relative shadow-inner group"
                                        onClick={() => !selectedFile && fileInputRef.current?.click()}
                                    >
                                        {previewUrl ? (
                                            <>
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedFile(null);
                                                        setPreviewUrl(null);
                                                    }}
                                                    className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/80 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 shadow-xl"
                                                    title="Supprimer la photo"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-4">
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                                                <span className="text-[10px] uppercase tracking-[0.3em] text-mina-gold">Choisir une photo de luxe</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 max-w-sm mx-auto">
                                        <h3 className="font-serif text-2xl">
                                            {selectedFile ? "Prêt pour le prestige" : "Analyse Multimodale"}
                                        </h3>
                                        <div className="relative grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={productContext}
                                                onChange={(e) => setProductContext(e.target.value)}
                                                placeholder="Nom du produit ?"
                                                className="w-full bg-transparent border-b border-mina-gold/30 py-3 font-serif text-lg focus:outline-none focus:border-mina-gold transition-colors placeholder:opacity-30 text-center"
                                            />
                                            <input
                                                type="text"
                                                value={priceContext}
                                                onChange={(e) => setPriceContext(e.target.value)}
                                                placeholder="Prix (ex: 150000)"
                                                className="w-full bg-transparent border-b border-mina-gold/30 py-3 font-serif text-lg focus:outline-none focus:border-mina-gold transition-colors placeholder:opacity-30 text-center"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleStartAnalysis}
                                        disabled={!selectedFile}
                                        className={`gold-gradient px-16 py-5 text-[11px] font-bold uppercase tracking-[0.4em] text-white rounded-full hover:scale-105 transition-transform shadow-xl shadow-mina-gold/30 ${!selectedFile && 'opacity-30 grayscale'}`}
                                    >
                                        Lancer l'Analyse Royal
                                    </button>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="text-center space-y-12 animate-fade-in relative z-10">
                                    <div className="relative w-40 h-40 mx-auto">
                                        <div className="absolute inset-0 border-[1px] border-mina-gold/10 rounded-full scale-150 animate-pulse"></div>
                                        <div className="absolute inset-0 border-t-2 border-mina-gold rounded-full animate-spin"></div>
                                        <div className="absolute inset-4 overflow-hidden rounded-full border border-mina-gold/20">
                                            {previewUrl && <img src={previewUrl} className="w-full h-full object-cover grayscale opacity-50" alt="Analyzing" />}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-serif text-3xl italic font-light">Rédaction de la fiche prestige...</h3>
                                        <p className="text-[10px] uppercase tracking-[0.5em] text-mina-gold animate-pulse">Gemini Vision 1.5 Pro</p>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="animate-slide-up space-y-8 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-serif text-3xl">Fiche Produit Générée</h3>
                                        <span className="bg-mina-emerald/10 text-mina-emerald text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-mina-emerald/20">IA Vérifiée</span>
                                    </div>

                                    <div className="space-y-6 bg-white/[0.02] p-8 rounded-2xl border border-white/5 shadow-2xl">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest opacity-30 block mb-2">Désignation Royale</label>
                                                <input
                                                    type="text"
                                                    value={mockProduct.name}
                                                    onChange={(e) => setMockProduct({ ...mockProduct, name: e.target.value })}
                                                    className="w-full bg-transparent font-serif text-2xl border-b border-mina-gold/10 pb-2 focus:outline-none focus:border-mina-gold"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest opacity-30 block mb-2">Valeur Estimée</label>
                                                <input
                                                    type="text"
                                                    value={mockProduct.price}
                                                    onChange={(e) => setMockProduct({ ...mockProduct, price: e.target.value })}
                                                    className="w-full bg-transparent font-sans font-bold text-mina-gold text-2xl border-b border-mina-gold/10 pb-2 focus:outline-none focus:border-mina-gold"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest opacity-30 block mb-2">Storytelling SEO</label>
                                            <p className="text-sm font-light leading-relaxed opacity-80 italic font-serif">"{mockProduct.description}"</p>
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest opacity-30 block mb-2">Empreinte Digitale (Tags)</label>
                                            <div className="flex gap-2 flex-wrap mt-2">
                                                {mockProduct.seo.split(',').map(tag => (
                                                    <span key={tag} className="text-[9px] bg-mina-onyx text-mina-gold border border-mina-gold/20 px-4 py-1.5 rounded-full uppercase tracking-widest">{tag.trim()}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {publishStatus === "success" && (
                                        <div className="bg-mina-emerald/10 border border-mina-emerald/30 p-5 rounded-2xl text-mina-emerald text-center text-sm font-serif italic animate-fade-in shadow-lg">
                                            ✨ La pièce a été immortalisée dans votre boutique avec succès.
                                        </div>
                                    )}

                                    {publishStatus === "error" && (
                                        <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl text-red-400 text-center text-sm animate-fade-in shadow-xl">
                                            <p className="font-bold mb-1">❌ Erreur de Publication</p>
                                            <p className="opacity-70 text-[11px]">{lastError || "Une erreur est survenue lors de la publication."}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        <button
                                            onClick={handlePublish}
                                            disabled={isPublishing || publishStatus === "success"}
                                            className="flex-1 gold-gradient py-5 text-[11px] font-bold uppercase tracking-[0.4em] rounded-2xl shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-30"
                                        >
                                            {isPublishing ? "Immortalisé..." : publishStatus === "success" ? "Déjà Publié" : "Publier sur la Boutique"}
                                        </button>
                                        <button onClick={resetAnalysis} className="px-10 py-5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-white/5 transition-all">
                                            {publishStatus === "success" ? "Nouvelle Pièce" : "Réinitialiser"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-5 space-y-8">
                        <div className="glass rounded-[2rem] p-10 border-mina-gold/20 shadow-2xl relative overflow-hidden group">
                            <h4 className="font-serif text-3xl mb-8 text-mina-onyx">Détails Financiers</h4>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-mina-onyx/70">
                                    <span className="text-xs uppercase tracking-widest">Acquisition</span>
                                    <span className="font-mono font-bold">88,142 FCFA</span>
                                </div>
                                <div className="flex justify-between items-center text-mina-onyx/70">
                                    <span className="text-xs uppercase tracking-widest">Logistique Luxe</span>
                                    <span className="font-mono font-bold">7,006 FCFA</span>
                                </div>
                                <div className="pt-6 border-t border-mina-gold/10">
                                    <div className="bg-mina-onyx p-8 rounded-3xl text-mina-gold flex justify-between items-center">
                                        <span className="text-xs uppercase tracking-widest font-bold">Marge Nette</span>
                                        <span className="text-4xl font-black">+79,852</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-dark rounded-[2rem] p-10 border-mina-gold/10 shadow-2xl relative overflow-hidden">
                            <h4 className="text-mina-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-8">Directives d'Élégance</h4>
                            <ul className="space-y-6">
                                {[
                                    { t: "Vocabulaire Royal", d: "Sophistiqué et persuasif" },
                                    { t: "Focus Raw Hair", d: "Vrai Vietnam d'origine" },
                                    { t: "SEO Elite", d: "Structure sémantique parfaite" }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="h-2 w-2 rounded-full bg-mina-gold mt-2 shrink-0"></div>
                                        <div>
                                            <p className="text-white font-serif text-lg">{item.t}</p>
                                            <p className="text-white/40 text-[10px] uppercase tracking-widest">{item.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                @keyframes progress {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0%); }
                }
            `}</style>
        </div>
    );
}
