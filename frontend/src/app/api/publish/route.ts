import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, description, price, categories } = await req.json();

        const siteUrl = process.env.WC_SITE_URL || "http://localhost:8080";
        const consumerKey = process.env.WC_CONSUMER_KEY;
        const consumerSecret = process.env.WC_CONSUMER_SECRET;

        if (!consumerKey || !consumerSecret) {
            console.error("CRITICAL: WooCommerce credentials missing in .env.local");
            return NextResponse.json({ success: false, error: "Configuration WooCommerce manquante (clés API)" }, { status: 500 });
        }

        // Clean price (remove characters like "FCFA")
        const numericPrice = price.replace(/[^0-9]/g, "");
        const finalPrice = numericPrice === "" ? "0" : numericPrice;

        let wcUrl = `${siteUrl}/wp-json/wc/v3/products`;
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

        console.log("Publishing Attempt (Standard):", { url: wcUrl, product: name, price: finalPrice });

        // Helper for fetch with timeout
        const fetchWithTimeout = async (url: string, options: any, timeout = 15000) => {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });
                clearTimeout(id);
                return response;
            } catch (error) {
                clearTimeout(id);
                throw error;
            }
        };

        let response;
        try {
            response = await fetchWithTimeout(wcUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${auth}`,
                },
                body: JSON.stringify({
                    name,
                    type: "simple",
                    regular_price: finalPrice,
                    description: description,
                    short_description: description.substring(0, 150) + "...",
                    status: "publish",
                    categories: categories || [{ id: 1 }],
                }),
            });
        } catch (error: any) {
            console.error("Standard Fetch Error / Timeout:", error.name === 'AbortError' ? 'Timeout' : error.message);
            // If it failed/timed out, we still try legacy next
            response = { status: 404, headers: { get: () => '' } } as any;
        }

        // If standard URL fails with 404, HTML, or Timeout, try legacy URL
        if (response.status === 404 || !response.headers.get("content-type")?.includes("application/json")) {
            const legacyUrl = `${siteUrl}/?rest_route=/wc/v3/products`;
            console.warn("Standard REST API failed or timed out, retrying with Legacy URL:", legacyUrl);

            try {
                response = await fetchWithTimeout(legacyUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${auth}`,
                    },
                    body: JSON.stringify({
                        name,
                        type: "simple",
                        regular_price: finalPrice,
                        description: description,
                        short_description: description.substring(0, 150) + "...",
                        status: "publish",
                        categories: categories || [{ id: 1 }],
                    }),
                });
            } catch (error: any) {
                console.error("Legacy Fetch Error / Timeout:", error.name === 'AbortError' ? 'Timeout' : error.message);
                return NextResponse.json({
                    success: false,
                    error: error.name === 'AbortError' ? "Le serveur WordPress est trop lent à répondre (Timeout). Réessayez." : "Erreur de connexion : " + error.message
                }, { status: 504 });
            }
        }

        const responseText = await response.text();
        console.log("WooCommerce Raw Response:", responseText.substring(0, 500));

        try {
            const data = JSON.parse(responseText);
            if (data.id) {
                return NextResponse.json({
                    success: true,
                    id: data.id,
                    permalink: data.permalink
                });
            } else {
                console.error("WooCommerce API Error JSON:", data);
                return NextResponse.json({
                    success: false,
                    error: data.message || "Erreur WooCommerce: " + JSON.stringify(data)
                }, { status: 400 });
            }
        } catch (e) {
            console.error("WooCommerce Parse Error (Response was not JSON):", e);
            return NextResponse.json({
                success: false,
                error: "Le serveur a renvoyé une erreur HTML au lieu de JSON. Vérifiez si les Permalinks sont activés dans WordPress.",
                raw: responseText.substring(0, 200)
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error("WooCommerce Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
