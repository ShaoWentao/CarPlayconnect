import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { GeoLocation } from "../types";

let client: GoogleGenerativeAI | null = null;
let model: GenerativeModel | null = null;

export const initializeGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return;

  client = new GoogleGenerativeAI(apiKey);

  model = client.getGenerativeModel({
    model: "gemini-2.5-flash",
    tools: [{ google_maps: {} }],
    systemInstruction:
      "You are an intelligent car co-pilot. Keep responses short and helpful for a driver.",
  });
};

export const generateAssistantResponse = async (
  prompt: string,
  location: GeoLocation | null
): Promise<string> => {
  if (!client || !model) {
    initializeGemini();
    if (!client || !model) return "Error: API Key missing.";
  }

  try {
    // 用户输入
    const userInput = {
      text: prompt,
    };

    // 可选定位信息
    const toolConfig = location
      ? {
          google_maps: {
            location: {
              lat: location.latitude,
              lng: location.longitude,
            },
          },
        }
      : undefined;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [userInput],
        },
      ],
      toolConfig,
    });

    const responseText =
      result.response.text() ||
      "I'm not sure how to help with that while driving.";

    // 处理地图结果（grounding chunks）
    let mapInfo = "";
    const chunks =
      result.response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const places = chunks
      .filter((c: any) => c.maps?.title)
      .map((c: any) => c.maps.title)
      .join(", ");

    if (places) {
      mapInfo = `\n\nFound nearby: ${places}`;
    }

    return responseText + mapInfo;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I lost connection to the cloud.";
  }
};
