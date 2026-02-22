export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://headless.tafa-business.com/graphql";

export async function fetchGraphQL(query: string, variables = {}) {
    const res = await fetch(WORDPRESS_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        cache: 'no-store'
    });

    const json = await res.json();
    if (json.errors) {
        console.error("GraphQL Errors:", JSON.stringify(json.errors, null, 2));
        throw new Error("Failed to fetch API");
    }

    return json.data;
}
export async function fetchWC(endpoint: string) {
    const siteUrl = "https://headless.tafa-business.com";
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    const url = `${siteUrl}/wp-json/wc/v3/${endpoint}${endpoint.includes('?') ? '&' : '?'}consumer_key=${ck}&consumer_secret=${cs}`;

    const res = await fetch(url, {
        next: { revalidate: 60 } // Équilibre parfait : Mise à jour toutes les minutes
    });
    if (!res.ok) {
        console.error(`WC REST Error (${res.status}):`, await res.text());
        return [];
    }
    return res.json();
}
