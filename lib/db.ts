import { sql } from "@vercel/postgres";

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
  const { rows } = await sql`SELECT * FROM projects ORDER BY priority DESC, created_at DESC`;
  return rows;
}

export async function addProject(project: any) {
  const {
    title,
    description_uz,
    description_en,
    image_src,
    live_url,
    github_url,
    tech_stack,
    image_position,
    priority
  } = project;

  await sql`
    INSERT INTO projects (
      title, description_uz, description_en, image_src, live_url, github_url, tech_stack, image_position, priority
    ) VALUES (
      ${title}, ${description_uz}, ${description_en}, ${image_src}, ${live_url}, ${github_url}, ${tech_stack}, ${image_position}, ${priority}
    )
  `;
}
