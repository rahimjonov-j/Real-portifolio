import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

function assertAdmin(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!adminSecret) return "Serverda ADMIN_SECRET env qo'yilmagan.";
  if (authHeader !== `Bearer ${adminSecret}`) return "Unauthorized";
  return null;
}

export async function POST(request: Request) {
  const authError = assertAdmin(request);
  if (authError) {
    return NextResponse.json(
      { error: authError },
      { status: authError === "Unauthorized" ? 401 : 500 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fayl topilmadi." }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Faqat rasm fayllari ruxsat etiladi (jpg, png, webp, gif, svg)." },
      { status: 400 }
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Fayl hajmi 5MB dan oshmasligi kerak." }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const slug = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const filename = `${slug}-${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "img", "optimized");
  const filePath = path.join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/img/optimized/${filename}` });
}
