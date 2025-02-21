// app/api/run/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, WorkflowRequest } from '@/types';

const API_BASE_URL = 'https://aitutor-api.vercel.app/api/v1/run';
const API_KEY = process.env.AITUTOR_API_KEY || 'sk_miir80g4l5fe82707jiypvlg1ubz2ruw';

const WORKFLOW_MAPPINGS = {
  'website-content': 'wf_p2wq82lst0zv8ai4xzqngg9c',
  'executive-summary': 'wf_rnt83hja65v396tfacrkc90v',
  'market-analysis': 'wf_l16fob3uhzbla275dliwa7xw',
  'product-line': 'wf_dqdzodpzkeygaozu6axhesmb',
  'market-strategy': 'wf_acuyc5g9m7srgizvmx24b5ke',
  'sales-strategy': 'wf_kairwr8n4qqd8fvnvpq9z4sk',
  'operations-plan': 'wf_xuj87kcpg5oeia7qudl2m2l6'
};

export async function POST(req: NextRequest) {
  console.log('API route called');
  try {
    const requestData: WorkflowRequest = await req.json();
    console.log('Received request data:', requestData);

    const { workflowId, formData } = requestData;
    console.log('Extracted workflowId:', workflowId);
    console.log('Extracted formData:', formData);

    const workflowEndpoint = WORKFLOW_MAPPINGS[workflowId as keyof typeof WORKFLOW_MAPPINGS];
    console.log('Mapped workflow endpoint:', workflowEndpoint);

    if (!workflowEndpoint) {
      console.error('Invalid workflow ID:', workflowId);
      return new NextResponse(
        JSON.stringify({ success: false, error: `Invalid workflow ID: ${workflowId}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    console.log('Sending request to:', `${API_BASE_URL}/${workflowEndpoint}`);
    const response = await fetch(`${API_BASE_URL}/${workflowEndpoint}`, options);
    const data = await response.json();

    console.log('Response from API:', data);

    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({ success: false, error: data.error || 'API request failed' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        result: data.result,
        workflow_id: workflowId,
        run_id: data.run_id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('API Route Error:', error);
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
