import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";import type { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: 'Dynamic Project Page',
}

async function getProject(id: string) {
  const res = await fetch(
    `https://portfolio-backend001.vercel.app/api/projects/${id}`
  );
  const data = await res.json();
  return data;
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  return (
    <main className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {project.description}
            </p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies[0]
                  .replace(/[\[\]']/g, "")
                  .split(",")
                  .map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {tech.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Visit Live Site
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
