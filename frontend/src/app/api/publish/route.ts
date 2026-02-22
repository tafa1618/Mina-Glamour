import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, description, price, categories, images } = await req.json();

        const siteUrl = process.env.WC_SITE_URL || "http://localhost:8080";
        const consumerKey = process.env.WC_CONSUMER_KEY;
        const consumerSecret = process.env.WC_CONSUMER_SECRET;

        if (!consumerKey || !consumerSecret) {
            console.error("CRITICAL: WooCommerce credentials missing in .env.local");
            return NextResponse.json({ success: false, error: "Configuration WooCommerce manquante (clés API)" }, { status: 500 });
        }

        // Clean price (remove characters like "FCFA")
        const numericPrice = (price || "0").replace(/[^0-9]/g, "");
        const finalPrice = numericPrice === "" ? "0" : numericPrice;

        // Prepare image data for WooCommerce
        const wcImages = images ? images.map((img: string | { src: string }) =>
            typeof img === 'string' ? { src: img } : img
        ) : [];

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

        const postData = {
            name,
            type: "simple",
            regular_price: finalPrice,
            description: description,
            short_description: description.substring(0, 150) + "...",
            status: "publish",
            categories: (categories && categories.length > 0) ? categories : [{ id: 15 }], // Fallback to 'Uncategorized' ID 15
            images: wcImages
        };

        // Try Standard URL with Query Params (Most robust for LWS/cPanel)
        const wcUrlQP = `${siteUrl}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
        console.log("Publishing Attempt (Standard - Query Params):", { product: name, images: wcImages.length });

        let response;
        try {
            response = await fetchWithTimeout(wcUrlQP, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });
        } catch (error: any) {
            console.error("Query Param Fetch Error:", error.message);
            response = { status: 500, headers: { get: () => '' } } as any;
        }

        // Fallback to Header Auth if Query Param failed with 401
        if (response.status === 401) {
            console.warn("Query Param auth failed, trying Header Auth...");
            const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
            const wcUrlHeaders = `${siteUrl}/wp-json/wc/v3/products`;
            try {
                response = await fetchWithTimeout(wcUrlHeaders, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${auth}`,
                    },
                    body: JSON.stringify(postData),
                });
            } catch (e) { }
        }

        // Final Legacy Fallback (?rest_route=)
        if (response.status === 404 || response.status === 401 || !response.headers.get("content-type")?.includes("application/json")) {
            const legacyUrl = `${siteUrl}/?rest_route=/wc/v3/products&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
            console.warn("Traditional REST API failed, trying Legacy URL with Query Params:", legacyUrl);
            try {
                response = await fetchWithTimeout(legacyUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(postData),
                });
            } catch (error: any) {
                console.error("Legacy Fetch Error:", error.message);
                return NextResponse.json({ success: false, error: "Échec total de connexion à WooCommerce." }, { status: 504 });
            }
        }
        const responseText = await response.text();
        console.log("WooCommerce Raw Response:", responseText.substring(0, 1000));

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
                    error: data.message || "Erreur WooCommerce: " + JSON.stringify(data),
                    details: data
                }, { status: 400 });
            }
        } catch (e) {
            console.error("WooCommerce Parse Error:", e);
            return NextResponse.json({
                success: false,
                error: "Le serveur a renvoyé une erreur non-JSON. Possible restriction de sécurité sur LWS.",
                raw: responseText.substring(0, 500)
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error("WooCommerce Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
