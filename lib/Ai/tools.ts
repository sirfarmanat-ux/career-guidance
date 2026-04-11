import { Tool, Type } from "@google/genai";

export const universityTools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "findUniversities",
        description:
          "Search colleges by name, location, type, accreditation, placement tier, fee, or hostel. Call this when the user mentions a college name or asks for options.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            names: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "College names to look up e.g. ['IIT Bombay', 'VIT']",
            },
            location: { type: Type.STRING, description: "City or state e.g. 'Mumbai', 'Tamil Nadu'" },
            type: { type: Type.STRING, description: "College type e.g. 'private', 'government'" },
            accreditation: { type: Type.STRING, description: "e.g. 'NAAC A', 'NAAC A+'" },
            placement_tier: {
              type: Type.STRING,
              enum: ["tier1", "tier2", "tier3"],
              description: "Placement tier of the college",
            },
            max_annual_fee_inr: {
              type: Type.NUMBER,
              description: "Maximum annual fee in INR",
            },
            hostel_required: {
              type: Type.BOOLEAN,
              description: "Filter only colleges with hostel",
            },
          },
          required: [],
        },
      },

      {
        name: "compareUniversities",
        description:
          "Compare two or more colleges side by side on placements, fees, facilities, and programs. Always call this when the user asks to compare colleges.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            names: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "College names to compare e.g. ['IIT Bombay', 'NIT Trichy']",
            },
            college_ids: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "College IDs if already known from a previous tool call",
            },
          },
          required: [],
        },
      },

      {
        name: "fetchCourseDetails",
        description:
          "Get specialization and course details for a specific college. Call when the user asks about programs, fees, entrance exams, or eligibility at a college.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            college_id: {
              type: Type.STRING,
              description: "The college_id from findUniversities or compareUniversities",
            },
            course_name: {
              type: Type.STRING,
              description: "e.g. 'B.Tech', 'MBA', 'BCA'",
            },
            stream: {
              type: Type.STRING,
              description: "e.g. 'science', 'commerce', 'humanities'",
            },
            specialization_name: {
              type: Type.STRING,
              description: "e.g. 'Computer Science', 'Data Science'",
            },
          },
          required: ["college_id"],
        },
      },

      {
        name: "searchBySpecialization",
        description:
          "Find colleges that offer a specific specialization, match a career path, psychometric trait, or entrance exam. Use when the user describes what they want to study or what career they want.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            specialization_name: {
              type: Type.STRING,
              description: "e.g. 'Artificial Intelligence', 'Finance'",
            },
            career_path: {
              type: Type.STRING,
              description: "e.g. 'Data Scientist', 'Investment Banker'",
            },
            psychometric_trait: {
              type: Type.STRING,
              description: "e.g. 'analytical', 'creative'",
            },
            stream: {
              type: Type.STRING,
              enum: ["science", "commerce", "humanities", "independent"],
            },
            entrance_exam: {
              type: Type.STRING,
              description: "e.g. 'JEE', 'CAT', 'NEET'",
            },
            max_annual_fee_inr: {
              type: Type.NUMBER,
              description: "Budget cap in INR per year",
            },
          },
          required: [],
        },
      },

      {
        name: "getUserProfile",
        description:
          "Read the current user's saved interests, preferred streams, and career goals from the database. Call ONLY when the user asks for personalized recommendations or says 'which is best for me'.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            clerkUserId: {
              type: Type.STRING,
              description: "The Clerk user ID of the current user",
            },
          },
          required: ["clerkUserId"],
        },
      },
    ],
  },
];