import Link from "next/link";
import Image from "next/image";
import { fetchWC } from "./lib/api";

export default async function Home() {
  const liveProducts = await fetchWC("products?per_page=8");

  const formatPrice = (price: string) => {
    if (!price) return "Sur demande";
    const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));
    return new Intl.NumberFormat("fr-FR").format(numeric) + " FCFA";
  };

  const categories = [
    { name: "Raw Hair Vietnam", img: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=600", link: "/category/cheveux" },
    { name: "Mina Bags", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600", link: "/category/sacs" },
    { name: "Prêt-à-Porter", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600", link: "/category/vetements" }
  ];

  return (
    <div id="top" className="flex min-h-screen flex-col bg-background text-foreground selection:bg-mina-gold selection:text-white">
      {/* Premium Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-500">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8 md:py-6">
          <Link href="/#top" className="group flex flex-col items-center">
            <div className="relative h-14 w-14 md:h-20 md:w-20 overflow-hidden rounded-full border-2 border-mina-gold/20 transition-transform group-hover:scale-105 group-hover:border-mina-gold/50 shadow-xl">
              <Image
                src="/logo_mina_glamour.jpg"
                alt="Mina Glamour Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-mina-gold mt-1 text-[8px] font-bold uppercase tracking-[0.8em] md:text-[10px]">
              GLAMOUR
            </span>
          </Link>

          <div className="hidden space-x-12 text-[11px] font-bold uppercase tracking-[0.3em] md:flex lg:space-x-16">
            {[
              { label: "Cheveux", href: "/category/cheveux" },
              { label: "Sacs", href: "/category/sacs" },
              { label: "Vêtements", href: "/category/vetements" },
              { label: "Boutique", href: "#collection" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-foreground/80 transition-colors hover:text-mina-gold after:absolute after:-bottom-2 after:left-1/2 after:h-[1px] after:w-0 after:bg-mina-gold after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/agent" className="text-[10px] font-bold uppercase tracking-[0.2em] border border-mina-gold/20 px-4 py-2 rounded-full hover:bg-mina-gold/10 transition-all text-mina-gold">
              Agent Manager
            </Link>
            <Link href="/cart" className="relative text-foreground/70 transition-colors hover:text-mina-gold hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow overflow-x-hidden">
        {/* Immersive Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 md:px-8 bg-[#FAF9F6]">
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mina-gold/5 blur-[80px] md:h-[800px] md:w-[800px] md:blur-[120px]"></div>

          <div className="relative z-10 mx-auto max-w-[1200px] text-center pt-32">
            <h2 className="animate-fade-in mb-6 text-[10px] font-bold uppercase tracking-[0.5em] text-mina-bronze md:text-sm md:tracking-[0.7em]">
              Mina Glamour — L'Excellence à votre portée
            </h2>
            <h1 className="animate-slide-up mb-8 font-serif text-[clamp(2.5rem,9vw,8rem)] font-light leading-[1.1] tracking-tight text-mina-onyx">
              Découvrez la <br />
              <span className="text-gold-gradient italic font-normal">Perfection</span>
            </h1>

            <div className="animate-slide-up space-y-10" style={{ animationDelay: '0.4s' }}>
              <p className="mx-auto max-w-2xl text-base font-light leading-relaxed opacity-70 md:text-lg italic">
                Curation exclusive de cheveux vierges, sacs de créateurs et prêt-à-porter haut de gamme.
              </p>

              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Link
                  href="#collection"
                  className="gold-gradient w-64 px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-2xl transition-all hover:scale-105 hover:shadow-mina-gold/20 sm:w-auto rounded-full"
                >
                  Découvrir la Collection
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Category Explorer */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <Link key={cat.name} href={cat.link} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 shadow-lg">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-white font-serif text-2xl md:text-3xl mb-2">{cat.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-mina-gold border-b border-mina-gold/50 pb-1">Explorer →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Main Product Grid */}
        <section id="collection" className="mx-auto max-w-7xl px-6 py-24 md:px-8 border-t border-mina-onyx/5">
          <div className="mb-20 text-center">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-mina-gold mb-4">La Boutique Exclusive</h2>
            <h3 className="font-serif text-4xl font-light md:text-6xl text-mina-onyx">Incontournables du Moment</h3>
            <div className="mx-auto mt-6 h-[1px] w-24 bg-mina-gold/30"></div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {liveProducts.length > 0 ? liveProducts.map((product: any) => (
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
                <h4 className="font-serif text-xl mb-2 text-mina-onyx group-hover:text-mina-gold transition-colors" dangerouslySetInnerHTML={{ __html: product.name }}></h4>
                <div className="text-[10px] uppercase tracking-[0.1em] opacity-40 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}></div>
                <div className="flex items-center justify-between border-t border-mina-onyx/5 pt-4">
                  <p className="font-sans font-black text-mina-gold text-lg">{formatPrice(product.price)}</p>
                  <div className="h-8 w-8 rounded-full border border-mina-onyx/10 flex items-center justify-center group-hover:bg-mina-onyx group-hover:text-white transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-4 text-center py-24 opacity-30 italic font-serif">
                Nos artisans préparent votre prochaine collection...
              </div>
            )}
          </div>
        </section>

        {/* The Brand Spirit Section */}
        <section className="bg-mina-onyx py-32 text-white/90">
          <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden shadow-2xl group">
              <Image src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1200" alt="Brand Story" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-mina-gold/10 mix-blend-overlay"></div>
            </div>
            <div className="space-y-10">
              <span className="text-mina-gold text-[10px] font-bold uppercase tracking-[0.5em]">L'Esprit Mina Glamour</span>
              <h2 className="font-serif text-5xl md:text-7xl font-light leading-tight">Plus qu'une Marque, <span className="italic">Une Identité</span></h2>
              <p className="text-lg font-light leading-relaxed opacity-70">
                Née de la vision d'offrir l'élégance suprême aux femmes de Dakar et d'ailleurs, Mina Glamour ne sélectionne que la perfection. Chaque mèche, chaque robe, chaque sac raconte une histoire de noblesse et de modernité.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-mina-gold text-3xl font-serif mb-2 italic">Qualité</p>
                  <p className="text-xs uppercase tracking-widest opacity-50">Sélection Rigoureuse</p>
                </div>
                <div>
                  <p className="text-mina-gold text-3xl font-serif mb-2 italic">Service</p>
                  <p className="text-xs uppercase tracking-widest opacity-50">Accompagnement VIP</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-mina-gold/5 py-32 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-mina-gold mb-6">Cercle Privé Mina</h4>
            <h2 className="font-serif text-4xl md:text-6xl mb-8 text-mina-onyx">Rejoignez l'Elite</h2>
            <p className="text-lg font-light opacity-60 mb-12">Soyez la première informée de nos arrivages exclusifs et recevez des invitations pour nos ventes privées.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Votre email royal" className="flex-1 px-8 py-5 border-b border-mina-gold/30 bg-transparent focus:outline-none focus:border-mina-gold text-lg italic text-mina-onyx" />
              <button className="gold-gradient text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg hover:scale-105 transition-transform">S'abonner</button>
            </div>
          </div>
        </section>

        {/* Stats / Trust Bar */}
        <section className="bg-mina-emerald py-16 md:py-24 text-white overflow-hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 text-center sm:grid-cols-3 md:gap-20">
            <div className="space-y-1">
              <div className="font-serif text-3xl font-bold italic md:text-4xl">100%</div>
              <div className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-60 md:text-[10px] md:tracking-[0.3em]">Cheveux Humains</div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl font-bold italic md:text-4xl">24h</div>
              <div className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-60 md:text-[10px] md:tracking-[0.3em]">Livraison Dakar</div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl font-bold italic md:text-4xl">Premium</div>
              <div className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-60 md:text-[10px] md:tracking-[0.3em]">Expérience Client</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-50 py-16 md:py-24 border-t border-mina-onyx/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-16 text-mina-onyx">
            <div className="sm:col-span-2 space-y-6">
              <span className="font-serif text-xl font-bold tracking-widest uppercase md:text-2xl">MINA GLAMOUR</span>
              <p className="max-w-md text-sm leading-loose opacity-60">
                Inspirée par la beauté des femmes sénégalaises, Mina Glamour est la destination ultime pour celles qui ne font aucun compromis sur la qualité et l'élégance.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest md:text-[11px]">Aide</h4>
              <ul className="space-y-4 text-xs opacity-60">
                <li><Link href="#" className="hover:text-mina-gold transition-colors">Livraison</Link></li>
                <li><Link href="#" className="hover:text-mina-gold transition-colors">Retours</Link></li>
                <li><Link href="#" className="hover:text-mina-gold transition-colors">WhatsApp Assistance</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest md:text-[11px]">Suivez-nous</h4>
              <ul className="space-y-4 text-xs opacity-60">
                <li><Link href="#" className="hover:text-mina-gold transition-colors">Instagram</Link></li>
                <li><Link href="#" className="hover:text-mina-gold transition-colors">TikTok</Link></li>
                <li><Link href="#" className="hover:text-mina-gold transition-colors">WhatsApp Business</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-mina-onyx/5 pt-10 text-center md:mt-20">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 md:text-[10px] md:tracking-[0.5em]">
              © {new Date().getFullYear()} Mina Glamour. Cheveux de rêve, allure de Reine.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
