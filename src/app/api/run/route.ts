// app/api/run/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { story } = await req.json();

    if (!story) {
      return NextResponse.json({ error: 'Missing story parameter' }, { status: 400 });
    }

    const workflowId = process.env.WORKFLOW_ID;
    const apiKey = process.env.AITUTOR_API_KEY;

    if (!workflowId || !apiKey) {
      return NextResponse.json(
        { error: 'Missing environment variables: WORKFLOW_ID or AITUTOR_API_KEY' },
        { status: 500 }
      );
    }

    const response = await fetch(`https://aitutor-api.vercel.app/api/v1/run/${workflowId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ story }),
    });

    const data = await response.json();

    // Check for error from the external API
    if (!response.ok) {
        return NextResponse.json({error: data}, {status: response.status});
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

