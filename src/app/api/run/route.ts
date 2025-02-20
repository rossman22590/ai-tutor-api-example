// app/api/run/route.ts
import { NextRequest, NextResponse } from 'next/server';

const WORKFLOW_CONFIGS = {
  business: {
    id: 'wf_dlo0arja3o4x3s7m8gtayyxu',
    requiredFields: [
      'BusinessPlan', 'ProductName', 'CompanyName', 'MissionStatement',
      'BusinessObjectives', 'BusinessOverview', 'MarketNeeds', 'UniqueSellingProposition'
    ]
  },
  food: {
    id: 'wf_kje4ajgswaebfx7upzmbrfr9',
    requiredFields: ['food']
  },
  story: {
    id: 'wf_b1c45lj9pabaotitahwfk9gb',
    requiredFields: ['story']
  }
};

export async function POST(req: NextRequest) {
  try {
    const { workflowType, formData } = await req.json();

    // Validate workflow type
    if (!workflowType || !WORKFLOW_CONFIGS[workflowType as keyof typeof WORKFLOW_CONFIGS]) {
      return NextResponse.json({ 
        error: 'Invalid workflow type' 
      }, { status: 400 });
    }

    const workflow = WORKFLOW_CONFIGS[workflowType as keyof typeof WORKFLOW_CONFIGS];
    const apiKey = 'sk_h9e86nd9jfo5dyojrg9qaaq90bqo185p';

    // Prepare the request body based on workflow type
    let requestBody = {};
    if (workflowType === 'food') {
      requestBody = {
        food: formData.food
      };
    } else if (workflowType === 'story') {
      requestBody = {
        story: formData.story
      };
    } else {
      requestBody = formData;
    }

    console.log('Making API request:', {
      url: `https://aitutor-api.vercel.app/api/v1/run/${workflow.id}`,
      body: requestBody
    });

    const response = await fetch(`https://aitutor-api.vercel.app/api/v1/run/${workflow.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      return NextResponse.json({
        error: data.error || 'API request failed'
      }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}
