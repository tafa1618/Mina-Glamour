# Proposition : Mina Glamour — Concept & Écosystème Headless

Ce document détaille la vision stratégique, l'identité de marque et l'architecture technique de la boutique "Mina Glamour".

## 1. Identité de Marque (Branding)

### Concept du Logo
Le logo doit incarner la fusion entre la **féminité universelle** et l'**élégance africaine**.
- **Symbole** : Une silhouette stylisée suggérant à la fois une chevelure soyeuse et la forme d'un collier traditionnel ou d'une couronne discrète. Les lignes doivent être fluides et graphiques.
- **Typographie** : Un mélange de Serif luxueux (style *Cormorant Garamond*) pour "Mina" et un Sans-Serif minimaliste et espacé pour "Glamour".

### Palette de Couleurs
| Couleur | Code Hex | Signification |
| :--- | :--- | :--- |
| **Noir Onyx** | `#1A1A1A` | Luxe, profondeur, premium. |
| **Champagne Doré** | `#FDF8F0` | Douceur, fond élégant, lisibilité. |
| **Or Mat** | `#D4AF37` | Succès, éclat, racines africaines. |
| **Emeraude Profond** | `#043927` | (Accent) Mystère, sophistication, glamour. |

### Ton & Slogan
- **Ton** : Sophistiqué, complice, inspirant. Le site doit s'adresser à la femme comme à une reine ("La couronne que vous méritez").
- **Slogan** : *Mina Glamour : Cheveux de rêve, allure de Reine.*

---

## 2. Architecture Fonctionnelle

### Structure du Menu (Sitemap)
1. **Accueil** (Hero section avec les perruques phares)
2. **Cheveux** (Wigs, Bundles, Closures/Frontals, Ponytails)
3. **Prêt-à-Porter** (Robes Tendance, Robes Hijab, Talons)
4. **Intimité** (Lingerie Fine)
5. **Univers Enfants** (Vêtements & Accessoires)
6. **Mag' Glamour** (Astuces beauté, entretien cheveux, séduction) - *Générateur de trafic SEO*

### Parcours Client Optimisé
- **Discovery** : Reels Instagram/TikTok redirigeant vers des fiches produits optimisées mobile.
- **Engagement** : Quiz "Trouvez votre perruque idéale" pour personnaliser l'expérience.
- **Trust** : Avis clients vidéos et FAQ détaillée sur l'entretien.
- **Conversion** : Checkout simplifié avec paiement mobile (Wave/Orange Money).

---

## 3. Architecture Technique (Headless CMS)

### Stack Technologique
- **Backend (Headless CMS)** : `WordPress` + `WooCommerce` + `WPGraphQL`.
    - Permet une gestion facile des produits et du contenu par l'équipe Mina Glamour.
- **Frontend** : `Next.js` (App Router).
    - Rapidité extrême, SEO dynamique (SSR/ISR), expérience "App-like".
- **Styling** : `Vanilla CSS` ou `CSS Modules` pour un design ultra-fluide et premium.

### Organisation des Contenus (WordPress side)
- **CPT (Custom Post Types)** : 
    - `Conseils Beauté` (pour le Mag' Glamour).
    - `Lookbook` (galerie interactive).
- **Taxonomies** : Catégorisation par Persona (Adja, Fatou, Dieyna) pour des filtres intelligents.

### Paiements & Logistique
- **Passerelle** : Intégration `PayTech.sn` ou `CinetPay` pour supporter Wave et Orange Money nativement.
- **Hébergement** : `Vercel` (Frontend) et `DigitalOcean` (WP Managed) avec `Cloudflare` comme CDN/WAF.

---

## 4. Stratégie Produit & Intelligence Artificielle

### Systèmes Agentiques (Le "Cerveau" du Site)
Nous prévoyons l'implémentation de deux agents autonomes :
1. **Agent Trend-Scanner** : Scanne quotidiennement Instagram, Pinterest et les hashtags tendances au Sénégal/Afrique de l'Ouest pour identifier les styles de coiffures et robes en vogue.
2. **Agent Deal-Hunter** : Fait le lien entre les tendances et les fournisseurs Alibaba certifiés "Elite", proposant automatiquement des listes de nouveaux produits à importer.
3. **Agent Marketing & SEO** : Génère les descriptions de produits optimisées SEO, rédige les articles du "Mag' Glamour" et gère les micro-campagnes Facebook Ads / Google Ads pour maximiser le ROI.

### Stratégie de Vente
- **Produit d'appel** : "Kit d'entretien Cheveux Mina" (offert ou prix coûtant) pour capturer les emails.
- **Bundles** : 
    - *Pack Mariage* (Perruque Premium + Lingerie Fine).
    - *Pack Maman-Fille* (Robe tendance + Tenue enfant assortie).
- **Cross-selling Persona** : Si une cliente regarde une Robe Hijab (Fatou), l'IA propose une closure discrète et des astuces de séduction raffinées.

---

## 5. Prochaines étapes (Plan d'exécution)
1. Validation du branding et du sitemap.
2. Création de la maquette UI (Mobile-First).
3. Setup de l'instance WordPress Headless.
4. Développement du boilerplate Next.js.
