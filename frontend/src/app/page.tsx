import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-mina-gold selection:text-white">
      {/* Premium Navigation */}
      <header className="fixed top-0 z-50 w-full glass transition-all duration-500">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-6">
          <Link href="/" className="group flex flex-col items-center">
            <span className="font-serif text-3xl font-bold tracking-[0.3em] transition-all group-hover:tracking-[0.4em]">
              MINA
            </span>
            <span className="text-mina-gold -mt-1 text-[10px] font-bold uppercase tracking-[0.8em]">
              GLAMOUR
            </span>
          </Link>

          <div className="hidden space-x-12 text-[11px] font-bold uppercase tracking-[0.25em] md:flex">
            {["Cheveux", "Prêt-à-porter", "Enfants", "L'Atelier"].map((item) => (
              <Link
                key={item}
                href="#"
                className="relative after:absolute after:-bottom-2 after:left-1/2 after:h-[1px] after:w-0 after:bg-mina-gold after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative transition-transform hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/shop"
              className="bg-foreground px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-mina-gold hover:text-white"
            >
              Collection
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Immersive Hero Section */}
        <section className="relative flex h-screen items-center justify-center overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mina-gold/5 blur-[120px]"></div>

          <div className="relative z-10 mx-auto max-w-[1200px] px-8 text-center pt-24">
            <h2 className="animate-fade-in mb-4 text-xs font-bold uppercase tracking-[0.6em] text-mina-gold">
              Mina Glamour — Excellence & Raffinement
            </h2>
            <h1 className="animate-slide-up mb-8 font-serif text-[clamp(3.5rem,10vw,8rem)] font-light leading-[1.1] tracking-tight">
              L'Art de la <br />
              <span className="text-gold-gradient italic">Féminité Sublime</span>
            </h1>

            <div className="animate-slide-up space-y-10" style={{ animationDelay: '0.4s' }}>
              <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed opacity-70">
                Découvrez des perruques de luxe, des robes d'exception et une curation exclusive pensée pour la femme moderne qui embrasse son héritage.
              </p>

              <div className="flex flex-col flex-wrap items-center justify-center gap-6 sm:flex-row">
                <Link
                  href="#collection"
                  className="gold-gradient px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-2xl transition-all hover:scale-105 hover:shadow-mina-gold/20"
                >
                  Explorer la Boutique
                </Link>
                <Link
                  href="#heritage"
                  className="border-b border-foreground/30 py-2 text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:border-mina-gold hover:text-mina-gold"
                >
                  Notre Histoire
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="h-12 w-[1px] bg-foreground/30"></div>
          </div>
        </section>

        {/* Featured Collections Section */}
        <section id="collection" className="mx-auto max-w-7xl px-8 py-32">
          <div className="mb-16 flex items-end justify-between">
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-mina-gold">Curations Exclusives</h2>
              <h3 className="font-serif text-5xl font-light">Les Essentiels de la Reine</h3>
            </div>
            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-mina-gold hover:border-mina-gold transition-all">
              Tout Voir
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {/* PRODUCT 1: HAIR */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                <div className="absolute inset-0 flex items-center justify-center bg-mina-onyx/5 group-hover:scale-110 transition-transform duration-700">
                  <span className="font-serif text-lg italic opacity-20">Brazilian Deep Wave</span>
                </div>
                <div className="absolute top-4 left-4 bg-mina-gold px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white">Best-Seller</div>
              </div>
              <h4 className="font-serif text-xl mb-1">Perruque Lace Frontal 13x4</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-3">Cheveux Humains Brésiliens - 22 pouces</p>
              <p className="font-sans font-bold text-mina-gold">85.000 FCFA</p>
            </div>

            {/* PRODUCT 2: FASHION */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                <div className="absolute inset-0 flex items-center justify-center bg-mina-gold/5 group-hover:scale-110 transition-transform duration-700">
                  <span className="font-serif text-lg italic opacity-20">Abaya Prestige</span>
                </div>
                <div className="absolute top-4 left-4 bg-foreground px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-background">Nouveauté</div>
              </div>
              <h4 className="font-serif text-xl mb-1">Ensemble Abaya Melhfa</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-3">Soie de Médine - Coloris Sable</p>
              <p className="font-sans font-bold text-mina-gold">45.000 FCFA</p>
            </div>

            {/* PRODUCT 3: HAIR */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                <div className="absolute inset-0 flex items-center justify-center bg-mina-onyx/5 group-hover:scale-110 transition-transform duration-700">
                  <span className="font-serif text-lg italic opacity-20">Straight Silk Wigs</span>
                </div>
              </div>
              <h4 className="font-serif text-xl mb-1">Perruque Lisse "Silk Touch"</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-3">Grade 12A - 18 pouces - Densité 180%</p>
              <p className="font-sans font-bold text-mina-gold">75.000 FCFA</p>
            </div>

            {/* PRODUCT 4: KIDS */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                <div className="absolute inset-0 flex items-center justify-center bg-mina-gold/5 group-hover:scale-110 transition-transform duration-700">
                  <span className="font-serif text-lg italic opacity-20">Mina Petite</span>
                </div>
              </div>
              <h4 className="font-serif text-xl mb-1">Robe Cérémonie "Petite Reine"</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-3">Tulle & Satin - 2 à 10 ans</p>
              <p className="font-sans font-bold text-mina-gold">32.500 FCFA</p>
            </div>
          </div>
        </section>

        {/* Editorial Section - Mixed Grid */}
        <section className="mx-auto max-w-[1600px] px-8 py-32">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-8 animate-slide-up">
              <span className="text-mina-gold text-xs font-bold uppercase tracking-widest text-mina-gold">Collections Automne-Hiver</span>
              <h3 className="font-serif text-5xl font-light">L'Éclat du Sénéglos-Style</h3>
              <p className="text-lg font-light leading-relaxed opacity-70">
                Entre tradition hijab-chic et modernité internationale, nos robes sculptent une silhouette inoubliable. Chaque pièce est sélectionnée par notre Intelligence Agentique pour sa qualité et sa rareté.
              </p>
              <Link href="#" className="inline-block border-b border-mina-gold pb-1 text-sm font-bold italic text-mina-gold transition-all hover:pr-4">
                Découvrir le Lookbook →
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-8">
              <div className="animate-scale-in relative aspect-[3/4] overflow-hidden bg-zinc-200">
                {/* Realistic Placeholder Style */}
                <div className="absolute inset-0 flex items-center justify-center bg-mina-onyx/5">
                  <span className="font-serif text-xl italic opacity-20 underline">Luxury Wigs</span>
                </div>
              </div>
              <div className="animate-scale-in relative mt-12 aspect-[3/4] overflow-hidden bg-zinc-200" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 flex items-center justify-center bg-mina-gold/5">
                  <span className="font-serif text-xl italic opacity-20 underline">Hijab Couture</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats / Trust Bar */}
        <section className="bg-mina-emerald py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-20 px-8 text-center">
            <div>
              <div className="font-serif text-4xl font-bold italic">100%</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Cheveux Humains</div>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold italic">24h</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Livraison Dakar</div>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold italic">Premium</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Expérience Client</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-bg py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
            <div className="col-span-2 space-y-6">
              <span className="font-serif text-2xl font-bold tracking-widest uppercase">MINA GLAMOUR</span>
              <p className="max-w-md text-sm leading-loose opacity-60">
                Inspirée par la beauté des femmes sénégalaises, Mina Glamour est la destination ultime pour celles qui ne font aucun compromis sur la qualité et l'élégance.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest">Aide</h4>
              <ul className="space-y-4 text-xs opacity-60">
                <li><Link href="#">Livraison</Link></li>
                <li><Link href="#">Retours</Link></li>
                <li><Link href="#">Entretien Cheveux</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest">Suivez-nous</h4>
              <ul className="space-y-4 text-xs opacity-60">
                <li><Link href="#">Instagram</Link></li>
                <li><Link href="#">TikTok</Link></li>
                <li><Link href="#">WhatsApp Business</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 border-t border-foreground/5 pt-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">
              © {new Date().getFullYear()} Mina Glamour. Cheveux de rêve, allure de Reine.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
