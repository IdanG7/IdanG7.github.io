import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const view = await prisma.view.upsert({
      where: { slug },
      create: { slug, count: 0 },
      update: {},
    });

    return NextResponse.json({ views: view.count });
  } catch (e) {
    console.error("[views GET]", e);
    return NextResponse.json({ views: 0 });
  }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const view = await prisma.view.upsert({
      where: { slug },
      create: { slug, count: 1 },
      update: { count: { increment: 1 } },
    });

    return NextResponse.json({ views: view.count });
  } catch (e) {
    console.error("[views POST]", e);
    return NextResponse.json({ views: 0 });
  }
}
