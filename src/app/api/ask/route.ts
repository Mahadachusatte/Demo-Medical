import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getPreparedAnswer } from "@/data/prepared-answers";

const requestSchema = z.object({
  question: z.string().min(1).max(500),
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (limit.count >= 10) {
    return false;
  }
  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const body = await request.json();
    const { question } = requestSchema.parse(body);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      const result = getPreparedAnswer(question);
      return NextResponse.json(result);
    }

    // If API key exists, use prepared answers as fallback but could integrate
    // For demo, still use prepared answers
    const result = getPreparedAnswer(question);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
