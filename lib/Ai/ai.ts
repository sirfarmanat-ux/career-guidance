// "use server"
// import { GoogleGenAI } from "@google/genai";

// // In-memory cache for command responses
// const commandCache = new Map<string, unknown>();

// export async function giveCommand(command: string) {
//   // Check if command exists in cache
//   if (commandCache.has(command)) {
//     console.log("Returning cached response for command:", command);
//     return commandCache.get(command);
//   }

//   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: command,
//     });
//     console.log(response.text);
//     return response;
//   } catch (error) {
//     console.error("Error giving command to AI:", error);
//   }
// }