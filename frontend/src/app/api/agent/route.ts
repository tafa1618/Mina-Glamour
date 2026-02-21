import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { image, prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL: GEMINI_API_KEY missing in .env.local");
      return NextResponse.json({
        error: "Configuration IA manquante",
        description: "La clé API Gemini est introuvable. Veuillez vérifier le fichier .env.local."
      }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const systemPrompt = `
      Tu es l'Expert en Storytelling de Luxe pour Mina Glamour (Dakar).
      TA MISSION : Observer l'image avec précision et rédiger une fiche produit UNIQUE. 
      INTERDICTION de réutiliser le même texte pour différents produits.
      
      TON STYLE : Royal, poétique, persuasif. Utilise un vocabulaire riche (ex: "écrins", "volutes", "quintessence", "raffinement").
      
      CONSIGNES DE RÉDACTION :
      1. Nom : Majestueux (ex: "L'Héritage Vietnamien 22 pouces", "La Besace Onyx & Or").
      2. Description : Un récit de 120 à 150 mots qui décrit la texture, l'éclat et l'émotion du produit. Parle de la femme qui le portera.
      3. Prix : Estimation en FCFA (ex: "185 000 FCFA").
      4. SEO Tags : 5 mots-clés stratégiques.
      
      STRUCTURE JSON OBLIGATOIRE :
      {
        "name": "...",
        "description": "...",
        "price": "...",
        "seo_tags": "..."
      }
    `;

    const parts = [systemPrompt];
    if (image) {
      parts.push(image);
    }

    // Add specific instruction if prompt is provided
    const userPrompt = prompt ? `Produit à analyser : ${prompt}` : "Analyse ce produit pour Mina Glamour.";
    parts.push(userPrompt);

    const result = await model.generateContent(parts);
    const response = await result.response;
    let text = response.text();

    console.log("Gemini Raw Response:", text); // Debugging

    try {
      const data = JSON.parse(text);
      if (!data.description) {
        console.warn("Gemini response missing description field:", data);
      }
      return NextResponse.json(data);
    } catch (e) {
      console.error("Gemini JSON Parse Error:", e, "Raw text:", text);
      // Fallback extraction
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const finalData = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        name: prompt || "Produit Mina Glamour",
        description: "L'IA n'a pas pu générer de description valide. Veuillez réessayer.",
        price: "Sur demande",
        seo_tags: "luxe, mina, dakar"
      };
      return NextResponse.json(finalData);
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
