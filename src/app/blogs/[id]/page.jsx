import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

async function getBlog(id) {
  try {
    const res = await fetch(
      `https://portfolio-backend001.vercel.app/api/blogs/${id}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.id);
  
  // Format date
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Estimate read time if not provided
  const readTime = blog.readTime || 
    Math.max(1, Math.ceil((blog.content?.length || 0) / 1500)) + " min read";

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        <article>
          {/* Hero image */}
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={blog.createdAt}>{date}</time>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
            {blog.title}
          </h1>

          {/* Blog content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {blog.description}
            </p>
            
            {blog.content && (
              <div
                className="mt-6 space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Related posts - optional section */}
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* This would ideally be populated with actual related posts */}
              {[1, 2].map((i) => (
                <Link 
                  href="/blogs" 
                  key={i}
                  className="block p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <h3 className="text-lg font-medium mb-2 hover:text-primary transition-colors">
                    Continue exploring my articles
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Check out more posts about design, development, and technology
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}