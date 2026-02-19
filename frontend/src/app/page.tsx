import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header / Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-mina-gold/10 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-widest text-foreground">
              MINA <span className="text-mina-gold font-light italic">GLAMOUR</span>
            </span>
          </div>
          <div className="hidden space-x-8 text-sm font-medium uppercase tracking-[0.2em] md:flex">
            <Link href="#hair" className="hover:text-mina-gold transition-colors">Cheveux</Link>
            <Link href="#fashion" className="hover:text-mina-gold transition-colors">Prêt-à-porter</Link>
            <Link href="#mag" className="hover:text-mina-gold transition-colors">Le Mag</Link>
          </div>
          <div>
            <Link
              href="/shop"
              className="rounded-none bg-foreground px-6 py-2 text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-mina-gold hover:text-foreground"
            >
              Boutique
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-mina-gold/5 to-transparent"></div>
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="mb-6 animate-fade-in font-serif text-5xl font-light leading-tight sm:text-7xl">
              Cheveux de rêve, <br />
              <span className="italic text-mina-gold">allure de Reine.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg opacity-80 leading-relaxed font-sans">
              Découvrez notre collection exclusive de cheveux naturels, robes tendance et accessoires de luxe. L'élégance africaine revisitée.
            </p>
            <div className="flex justify-center gap-6">
              <Link
                href="/collection"
                className="border border-mina-gold bg-mina-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:bg-transparent"
              >
                Découvrir la collection
              </Link>
            </div>
          </div>
        </section>

        {/* Category Teaser */}
        <section className="bg-mina-onyx py-32 text-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="group relative overflow-hidden bg-background/5 p-12 text-center transition-all hover:bg-background/10">
                <h3 className="mb-4 font-serif text-3xl italic">Hair Collection</h3>
                <p className="mb-8 text-sm opacity-60 uppercase tracking-widest">Perruques & Extensions</p>
                <Link href="/hair" className="text-xs font-bold uppercase tracking-[0.3em] text-mina-gold hover:underline">Voir plus</Link>
              </div>
              <div className="group relative overflow-hidden bg-mina-gold/10 p-12 text-center transition-all hover:bg-mina-gold/20">
                <h3 className="mb-4 font-serif text-3xl italic">Prêt-à-Porter</h3>
                <p className="mb-8 text-sm opacity-60 uppercase tracking-widest">Robes & Chic</p>
                <Link href="/fashion" className="text-xs font-bold uppercase tracking-[0.3em] text-mina-gold hover:underline">Voir plus</Link>
              </div>
              <div className="group relative overflow-hidden bg-background/5 p-12 text-center transition-all hover:bg-background/10">
                <h3 className="mb-4 font-serif text-3xl italic">L'Univers Kids</h3>
                <p className="mb-8 text-sm opacity-60 uppercase tracking-widest">Élégance Miniature</p>
                <Link href="/kids" className="text-xs font-bold uppercase tracking-[0.3em] text-mina-gold hover:underline">Voir plus</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-mina-gold/10 py-12 text-center">
        <p className="text-xs opacity-40 uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} Mina Glamour. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
