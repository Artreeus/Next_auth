import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

async function getBlog(id) {
  const res = await fetch(
    `https://portfolio-backend001.vercel.app/api/blogs/${id}`
  );
  const data = await res.json();
  return data;
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.id);
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        <article>
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-xl mb-8">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <time dateTime={blog.createdAt}>{date}</time>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
            {blog.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {blog.description}
            </p>
            {blog.content && (
              <div
                className="mt-8"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}
          </div>

          {blog.tags && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(() => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
