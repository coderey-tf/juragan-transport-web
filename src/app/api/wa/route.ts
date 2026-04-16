import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const WA_NUMBER = "6282132213259";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source") || "unknown";
  const text = searchParams.get("text") || "";

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const referer = request.headers.get("referer") || "unknown";

  try {
    await prisma.waTracker.create({
      data: {
        source,
        message: text,
        ip,
        userAgent,
        referer,
      },
    });
  } catch (error) {
    console.error("Gagal mencatat klik WA:", error);
    // Tetap lanjutkan ke WhatsApp meski tracking gagal agar user tidak terganggu
  }

  // Arahkan ke WhatsApp
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  return NextResponse.redirect(waUrl);
}
