import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code2, BookOpen } from 'lucide-react';
import Hero from "@/components/ui/Hero";
import InfiniteCarousel from "@/components/shared/InfiniteCarousel";
import Footer from '@/components/ui/Footer';
// import { BlogCRUD ,ProjectCRUD } from '@/components/shared/CRUDComponents';


async function getProjects() {
  const res = await fetch('https://portfolio-backend001.vercel.app/api/projects');
  const data = await res.json();
  return data;
}

async function getBlogs() {
  const res = await fetch('https://portfolio-backend001.vercel.app/api/blogs');
  const data = await res.json();
  return data;
}

export default async function Home() {
  const projects = await getProjects();
  const blogs = await getBlogs();
  const initialProjects = projects.slice(0, 4);
  const initialBlogs = blogs.slice(0, 3);

  return (
    <>
      <main className="min-h-screen ">
        <Hero />
        <InfiniteCarousel />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Projects Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-foreground">
                  Featured Projects
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Discover my latest work and creative endeavors
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {initialProjects.map((project: any) => (
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

          {/* Blogs Section */}
          <div>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-foreground">
                  Latest Blog Posts
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Read about my insights and experiences
                </p>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initialBlogs.map((blog: any) => (
                <Link
                  href={`/blogs/${blog._id}`}
                  key={blog._id}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {blog.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>Read More</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* <BlogCRUD /> */}
        {/* <ProjectCRUD /> */}

      </main>
      <Footer />
    </>
  );
}