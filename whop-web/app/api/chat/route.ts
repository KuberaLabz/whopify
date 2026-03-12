import { NextResponse } from 'next/server';
import { whop, companyId } from '@/lib/whop';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Simple "Router" for the demonstration
    // In a real app, this would be handled by an LLM with tool calling
    if (message.toLowerCase().includes("audit")) {
      if (!companyId) return NextResponse.json({ error: "Company ID missing" }, { status: 400 });
      
      const products = await whop.products.list({ company_id: companyId });
      let productDetails = [];
      
      for await (const product of products) {
        productDetails.push({
          id: product.id,
          name: (product as any).name || (product as any).title,
        });
      }

      return NextResponse.json({ 
        role: "assistant", 
        content: `I've audited your store. You have ${productDetails.length} products.`,
        data: productDetails
      });
    }

    return NextResponse.json({ 
      role: "assistant", 
      content: "I'm ready to help with your Whop store. Try asking me to 'audit my store'!" 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
