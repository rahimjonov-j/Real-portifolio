import { sql } from "@vercel/postgres";

export type ProjectRow = {
  id: number;
  title: string;
  description_uz: string;
  description_en: string;
  image_src: string;
  live_url: string | null;
  github_url: string | null;
  tech_stack: string[];
  image_position: string | null;
  priority: boolean | null;
  created_at: Date;
};

export type ProjectInput = {
  title: string;
  description_uz: string;
  description_en: string;
  image_src: string;
  live_url?: string | null;
  github_url?: string | null;
  tech_stack: string[];
  image_position?: string | null;
  priority?: boolean;
};

export function hasDatabaseConnection() {
  return Boolean(process.env.POSTGRES_URL);
}

export async function createProjectsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description_uz TEXT NOT NULL,
      description_en TEXT NOT NULL,
      image_src TEXT NOT NULL,
      live_url TEXT,
      github_url TEXT,
      tech_stack TEXT[] NOT NULL,
      image_position TEXT DEFAULT 'center',
      priority BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function getProjects() {
  const { rows } = await sql<ProjectRow>`
    SELECT *
    FROM projects
    ORDER BY priority DESC, created_at DESC
  `;

  return rows;
}

export async function addProject(project: ProjectInput) {
  const {
    title,
    description_uz,
    description_en,
    image_src,
    live_url = null,
    github_url = null,
    tech_stack,
    image_position = "center",
    priority = false
  } = project;
  const techStackValue = tech_stack.join(",");

  await sql`
    INSERT INTO projects (
      title,
      description_uz,
      description_en,
      image_src,
      live_url,
      github_url,
      tech_stack,
      image_position,
      priority
    ) VALUES (
      ${title},
      ${description_uz},
      ${description_en},
      ${image_src},
      ${live_url},
      ${github_url},
      string_to_array(${techStackValue}, ','),
      ${image_position},
      ${priority}
    )
  `;
}

export async function deleteProject(id: number) {
  const result = await sql`
    DELETE FROM projects
    WHERE id = ${id}
  `;

  return result.rowCount ?? 0;
}
