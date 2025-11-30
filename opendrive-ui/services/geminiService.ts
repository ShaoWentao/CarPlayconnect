import { GoogleGenAI } from "@google/genai";
import { GeoLocation } from "../types";

let client: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (process.env.API_KEY) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const generateAssistantResponse = async (
  prompt: string,
  location: GeoLocation | null
): Promise<string> => {
  if (!client) {
    initializeGemini();
    if (!client) return "Error: API Key missing.";
  }

  try {
    const config: any = {
      tools: [{ googleMaps: {} }],
      systemInstruction: "You are an intelligent car co-pilot. Keep responses short, concise, and helpful for a driver. Do not use markdown formatting extensively. Focus on driving tasks, locations, and music.",
    };

    if (location) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
      };
    }

    const response = await client!.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: config,
    });

    // Check for grounding chunks (Map results)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let mapInfo = "";
    
    if (groundingChunks) {
      // Very basic extraction of found places to append to the text response
      const places = groundingChunks
        .filter((c: any) => c.maps?.title)
        .map((c: any) => c.maps.title)
        .join(", ");
      
      if (places) {
        mapInfo = `\n\nFound nearby: ${places}`;
      }
    }

    return (response.text || "I'm not sure how to help with that while driving.") + mapInfo;

  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I lost connection to the cloud.";
  }
};
