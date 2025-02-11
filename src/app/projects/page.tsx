import Link from "next/link";
import Image from "next/image";
import { Code2 } from "lucide-react";

async function getProjects() {
  const res = await fetch(
    "https://portfolio-backend001.vercel.app/api/projects"
  );
  const data = await res.json();
  return data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            All Projects
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore my complete portfolio of work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <Link
              href={`/projects/${project._id}`}
              key={project._id}
              className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video relative">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span className="text-sm opacity-90">View Details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
