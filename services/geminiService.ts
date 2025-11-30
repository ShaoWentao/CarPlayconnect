import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeoLocation } from "../types";

// 用官方 SDK 的类名作为类型
let client: GoogleGenerativeAI | null = null;

// 初始化 Gemini 客户端
export const initializeGemini = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API key is missing (process.env.API_KEY).");
    return;
  }

  client = new GoogleGenerativeAI(apiKey);
};

// 生成车载助手回复（简化版：纯文本）
export const generateAssistantResponse = async (
  prompt: string,
  location: GeoLocation | null
): Promise<string> => {
  if (!client) {
    initializeGemini();
    if (!client) {
      return "Error: API Key missing.";
    }
  }

  try {
    // 使用一个稳定可用的模型名，如 gemini-1.5-flash
    const model = client.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // 根据是否有定位信息，拼接一个更智能的提示词
    let fullPrompt = prompt;

    if (location) {
      fullPrompt =
        `You are an in-car assistant. The driver is currently at ` +
        `latitude ${location.latitude}, longitude ${location.longitude}. ` +
        `Answer briefly and safely for someone who is driving. ` +
        `User question: ${prompt}`;
    }

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return (
      text || "I'm not sure how to help with that while driving."
    );
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I lost connection to the cloud.";
  }
};
