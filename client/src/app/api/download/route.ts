import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const fileUrl = req.nextUrl.searchParams.get("fileUrl");
  if (!fileUrl)
    return NextResponse.json({
      error: "File Url not found",
    });

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${fileUrl}`;

  return await fetch(url);
};
