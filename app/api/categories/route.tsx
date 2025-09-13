import { axiosClient } from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch categories from Strapi and populate all fields (e.g. icon)
    const result = await axiosClient.get("/categories?populate=*");
    return NextResponse.json(result.data);
  } catch (e: any) {
    console.error("Strapi error:", e.response?.data || e.message);
    return NextResponse.json(
      { error: e.response?.data || e.message },
      { status: e.response?.status || 500 }
    );
  }
}
