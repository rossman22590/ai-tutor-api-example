import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const apiKey = process.env.AITUTOR_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing environment variable: AITUTOR_API_KEY' },
        { status: 500 }
      );
    }

    // First Workflow - Workout Generation
    console.log('Starting First Workflow - Workout Generation', payload);
    const firstWorkflowId = process.env.WORKFLOW_ID_WORKOUT;
    
    if (!firstWorkflowId) {
      return NextResponse.json(
        { error: 'Missing environment variable: WORKFLOW_ID_WORKOUT' },
        { status: 500 }
      );
    }

    const firstWorkflowResponse = await fetch(`https://aitutor-api.vercel.app/api/v1/run/${firstWorkflowId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bodypart: payload.bodypart,
        difficulty: payload.difficulty,
        time: payload.time
      })
    });

    const firstWorkflowData = await firstWorkflowResponse.json();
    console.log('First Workflow Result:', firstWorkflowData);

    if (!firstWorkflowResponse.ok) {
      throw new Error('First workflow failed');
    }

    // Extract the workout plan and ensure it's a string
    const workoutPlan = firstWorkflowData.success ? firstWorkflowData.result : firstWorkflowData;
    
    // Second Workflow
    console.log('Starting Second Workflow');
    const secondWorkflowId = process.env.WORKFLOW_ID_MEAL;
    
    if (!secondWorkflowId) {
      return NextResponse.json(
        { error: 'Missing environment variable: WORKFLOW_ID_MEAL' },
        { status: 500 }
      );
    }

    // Ensure we're sending the exact format expected by the second workflow
    const secondWorkflowResponse = await fetch(`https://aitutor-api.vercel.app/api/v1/run/${secondWorkflowId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workflow1response: typeof workoutPlan === 'string' ? workoutPlan : JSON.stringify(workoutPlan)
      })
    });

    const secondWorkflowData = await secondWorkflowResponse.json();
    console.log('Second Workflow Result:', secondWorkflowData);

    if (!secondWorkflowResponse.ok) {
      throw new Error('Second workflow failed');
    }

    // Extract the meal plan
    const mealPlan = secondWorkflowData.success ? secondWorkflowData.result : secondWorkflowData;

    // Return both results
    return NextResponse.json({
      workout: workoutPlan,
      mealPlan: mealPlan
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Multi-step Workflow Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
