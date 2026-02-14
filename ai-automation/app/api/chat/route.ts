import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file.',
      });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert AI Automation Consultant specializing in n8n workflows and business process automation. You help businesses identify manual tasks that can be automated, recommend specific tools, and provide actionable advice. Be concise, practical, and specific. When suggesting automations, mention specific n8n nodes and integrations. Format your responses clearly with bullet points when listing items.`,
        },
        ...messages.slice(-10).map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json({
      reply: 'Sorry, something went wrong. Please check your API key and try again.',
    });
  }
}
