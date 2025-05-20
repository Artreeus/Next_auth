import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading"




async function getBlogs() {
  const res = await fetch("https://portfolio-backend001.vercel.app/api/blogs");
  const data = await res.json();
  return data;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}


export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <SectionHeading title="All Blogs Page"/>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: Blog) => (
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
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {blog.content}
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
    </main>
  );
}
