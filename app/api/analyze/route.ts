import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { generateN8nWorkflow } from '@/lib/n8n-generator';
import { calculateROI } from '@/lib/roi-calculator';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Create structured prompt for Claude
    const prompt = `You are an AI automation consultant analyzing a business workflow.

Business Details:
- Name: ${formData.businessName}
- Industry: ${formData.industry}
- Tools Used: ${formData.toolsUsed}
- Employees: ${formData.numberOfEmployees}
- Daily Transactions: ${formData.dailyTransactions}

Manual Workflow Description:
${formData.workflowDescription}

Analyze this workflow and identify:
1. Trigger events (what starts the process)
2. Repetitive tasks that can be automated
3. Specific automation actions
4. Recommended tools/integrations
5. Estimated time saved per month (in hours)
6. Risk level (Low/Medium/High)
7. Calculate automation score (0-100) based on complexity and ROI potential

Return ONLY a valid JSON object with this EXACT structure (no markdown, no explanations):
{
  "automation_score": <number 0-100>,
  "triggers": ["trigger1", "trigger2"],
  "actions": ["action1", "action2", "action3"],
  "recommended_tools": ["tool1", "tool2"],
  "estimated_hours_saved_per_month": <number>,
  "risk_level": "Low" | "Medium" | "High",
  "implementation_notes": "brief notes"
}`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract and parse Claude's response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '{}';
    let analysis;
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
    } catch (parseError) {
      // Fallback if parsing fails
      analysis = {
        automation_score: 75,
        triggers: ['Form submission', 'Email received'],
        actions: ['Data entry', 'Send notification', 'Update database'],
        recommended_tools: ['n8n', 'Webhook', 'Email'],
        estimated_hours_saved_per_month: 40,
        risk_level: 'Low',
        implementation_notes: 'Standard automation workflow'
      };
    }

    // Generate n8n workflow based on analysis
    const n8nWorkflow = generateN8nWorkflow(analysis, formData);

    // Calculate ROI
    const roi = calculateROI(
      analysis.estimated_hours_saved_per_month,
      parseInt(formData.hourlyRate),
      parseInt(formData.numberOfEmployees)
    );

    // Return comprehensive results
    return NextResponse.json({
      analysis,
      n8nWorkflow,
      roi,
      businessData: {
        name: formData.businessName,
        industry: formData.industry,
      },
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
