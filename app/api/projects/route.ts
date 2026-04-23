import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  addProject,
  createProjectsTable,
  deleteProject,
  getProjects,
  hasDatabaseConnection,
  type ProjectInput
} from "@/lib/db";

function normalizeOptionalUrl(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalizeProject(body: Record<string, unknown>): ProjectInput {
  const techStack = Array.isArray(body.tech_stack)
    ? body.tech_stack
    : String(body.tech_stack ?? "")
        .split(",")
        .map((tech) => tech.trim());

  return {
    title: String(body.title ?? "").trim(),
    description_uz: String(body.description_uz ?? "").trim(),
    description_en: String(body.description_en ?? "").trim(),
    details_uz: String(body.details_uz ?? "").trim(),
    details_en: String(body.details_en ?? "").trim(),
    image_src: String(body.image_src ?? "").trim(),
    live_url: normalizeOptionalUrl(body.live_url),
    github_url: normalizeOptionalUrl(body.github_url),
    tech_stack: techStack.filter(Boolean).map(String),
    image_position: String(body.image_position ?? "center").trim() || "center",
    priority: Boolean(body.priority)
  };
}

function validateProject(project: ProjectInput) {
  if (!project.title) return "Loyiha nomi majburiy.";
  if (!project.description_uz) return "O'zbekcha tavsif majburiy.";
  if (!project.description_en) return "Inglizcha tavsif majburiy.";
  if (!project.details_uz) return "O'zbekcha batafsil ma'lumot majburiy.";
  if (!project.details_en) return "Inglizcha batafsil ma'lumot majburiy.";
  if (!project.image_src) return "Rasm manzili majburiy.";
  if (project.tech_stack.length === 0) return "Kamida bitta texnologiya kiriting.";
  return null;
}

function assertAdmin(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!adminSecret) {
    return "Serverda ADMIN_SECRET env qo'yilmagan.";
  }

  if (authHeader !== `Bearer ${adminSecret}`) {
    return "Unauthorized";
  }

  return null;
}

function revalidateProjectPages() {
  revalidatePath("/uz/projects");
  revalidatePath("/en/projects");
}

export async function GET() {
  if (!hasDatabaseConnection()) {
    return NextResponse.json([]);
  }

  try {
    await createProjectsTable();
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to read projects:", error);
    return NextResponse.json(
      { error: "Projects bazadan o'qilmadi." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = assertAdmin(request);

  if (authError) {
    return NextResponse.json(
      { error: authError },
      { status: authError === "Unauthorized" ? 401 : 500 }
    );
  }

  if (!hasDatabaseConnection()) {
    return NextResponse.json(
      {
        error:
          "POSTGRES_URL env topilmadi. Vercel Storage orqali Postgres ulab, envlarni deployga qo'shing."
      },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const project = normalizeProject(body);
    const validationError = validateProject(project);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await createProjectsTable();
    await addProject(project);

    revalidateProjectPages();

    return NextResponse.json({ message: "Project added successfully" });
  } catch (error) {
    console.error("Failed to add project:", error);
    return NextResponse.json(
      { error: "Loyiha saqlanmadi. Ma'lumotlarni tekshirib qayta urinib ko'ring." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authError = assertAdmin(request);

  if (authError) {
    return NextResponse.json(
      { error: authError },
      { status: authError === "Unauthorized" ? 401 : 500 }
    );
  }

  if (!hasDatabaseConnection()) {
    return NextResponse.json(
      { error: "POSTGRES_URL env topilmadi." },
      { status: 503 }
    );
  }

  const id = Number(new URL(request.url).searchParams.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Project ID noto'g'ri." }, { status: 400 });
  }

  try {
    await createProjectsTable();
    const deletedCount = await deleteProject(id);

    if (deletedCount === 0) {
      return NextResponse.json({ error: "Project topilmadi." }, { status: 404 });
    }

    revalidateProjectPages();

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { error: "Project o'chirilmadi. Qayta urinib ko'ring." },
      { status: 500 }
    );
  }
}
