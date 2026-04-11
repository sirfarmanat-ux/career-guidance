// actions/chat.ts
"use server";

import { executeTool } from "@/lib/Ai/toolExecutor";
import { universityTools } from "@/lib/Ai/tools";
import { GoogleGenAI, Content, Part } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `You are a smart Indian university advisor chatbot.
You have access to a real college database with placement data, fees, specializations, and course details.

RESPONSE RULES:
- Always call findUniversities or compareUniversities before answering questions about specific colleges.
- Call fetchCourseDetails when asked about programs, fees, or entrance exams at a college.
- Call searchBySpecialization when the user describes a career goal or subject interest.
- Call getUserProfile only when the user explicitly asks for personalized recommendations.
- Format fees in INR with commas. Quote placement figures in LPA.
- Never make up college data — only use what the tools return.

TABLE RULES — CRITICAL, FOLLOW EXACTLY:
- You MUST NEVER use markdown tables (the | column | column | format). They are FORBIDDEN.
- Whenever you need to show any structured data, overview, comparison, or list of features — use ONLY the custom JSON block below.
- This applies to everything: college overviews, fee breakdowns, placement stats, course lists, comparisons.
- Wrap it exactly like this with no extra text before or after the block:

\`\`\`table
{
  "headers": ["Feature", "Details"],
  "rows": [
    ["Location", "Hauz Khas, Delhi"],
    ["Placement Tier", "Tier 1"],
    ["Avg. Placement", "25 LPA"]
  ],
  "caption": "Overview: IIT Delhi"
}
\`\`\`

- For comparisons use multiple columns:

\`\`\`table
{
  "headers": ["Feature", "IIT Delhi", "IIT Bombay"],
  "rows": [
    ["Location", "Delhi", "Mumbai"],
    ["Avg LPA", "25 LPA", "28 LPA"]
  ],
  "caption": "IIT Delhi vs IIT Bombay"
}
\`\`\`

- You may write a short sentence before or after a table block for context.
- NEVER output a | pipe | based | table | under any circumstance.`;

export async function chatWithUniversityBot(
  history: Content[],
  userMessage: string
): Promise<string> {
  try {
    const chat = ai.chats.create({
      model: "gemma-4-26b-a4b-it",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: universityTools,
      },
      history, // previous turns
    });

    let response = await chat.sendMessage({ message: userMessage });

    // Agentic loop — keep going until the model stops calling tools
    while (true) {
      const functionCalls = response.functionCalls;

      if (!functionCalls || functionCalls.length === 0) {
        // No more tool calls — return the final answer
        return response.text ?? "";
      }

      console.log(
        "Tool calls requested:",
        functionCalls.map((fc) => fc.name)
      );

      // Execute all tool calls in parallel
      const toolResults: Part[] = await Promise.all(
        functionCalls.map(async (call) => {
          const output = await executeTool(
            call.name!,
            (call.args ?? {}) as Record<string, unknown>
          );
          console.log(`Tool ${call.name} result:`, output);

          return {
            functionResponse: {
              name: call.name!,
              response: { output },
            },
          };
        })
      );

      // Feed results back to model
      response = await chat.sendMessage({ message: toolResults });
    }
  } catch (error) {
    console.error("Error in university chatbot:", error);
    throw error;
  }
}