import { NextResponse } from "next/server";
import { addProject, createProjectsTable, getProjects } from "@/lib/db";

export async function GET() {
  try {
    // Ensure table exists (for development/first run)
    await createProjectsTable();
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await addProject(body);
    return NextResponse.json({ message: "Project added successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
