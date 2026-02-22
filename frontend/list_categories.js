const siteUrl = 'https://headless.tafa-business.com';
const consumerKey = 'ck_370bfe8059a91a4fff2ea917ef05e03a3764a89d';
const consumerSecret = 'cs_3974694a4900554e245830ae0427df03f09521bb';

async function listCategories() {
    console.log("Inventaire des Catégories WooCommerce...");
    const url = `${siteUrl}/wp-json/wc/v3/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`Nombre de catégories trouvées : ${data.length}`);
        data.forEach(cat => {
            console.log(`- ${cat.name} (Slug: ${cat.slug}, ID: ${cat.id}, Count: ${cat.count})`);
        });
    } catch (e) {
        console.error("Erreur :", e.message);
    }
}

listCategories();
