import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk_miir80g4l5fe82707jiypvlg1ubz2ruw',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessPlan: requestData.BusinessPlan || "value",
        ProductName: requestData.ProductName || "value",
        CompanyName: requestData.CompanyName || "value",
        MissionStatement: requestData.MissionStatement || "value",
        BusinessObjectives: requestData.BusinessObjectives || "value",
        BusinessOverview: requestData.BusinessOverview || "value",
        MarketNeeds: requestData.MarketNeeds || "value",
        UniqueSellingProposition: requestData.UniqueSellingProposition || "value",
        objective: requestData.objective || "value"
      })
    };

    const response = await fetch(
      'https://aitutor-api.vercel.app/api/v1/run/wf_rnt83hja65v396tfacrkc90v',
      options
    );
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'API request failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
