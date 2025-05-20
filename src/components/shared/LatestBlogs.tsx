"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"

// Define proper types for our blog data
interface Blog {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
  readTime?: string;
  tags?: string[];
}

export default function LatestBlogs() {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('https://portfolio-backend001.vercel.app/api/blogs')
        
        if (!res.ok) {
          throw new Error('Failed to fetch blogs')
        }
        
        const data = await res.json()
        // Take only the first 3 blogs for the featured section
        setLatestBlogs(data.slice(0, 3))
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching blogs:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (isLoading) {
    return (
      <div className="mb-20 flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mb-20 py-10 text-center">
        <p className="text-red-500">Error loading blogs: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    )
  }

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recent"
    
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header with section heading */}
        <div className="text-center mb-16">
          <SectionHeading title="Latest Blog Posts" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my insights, experiences, and thoughts on design, development, and technology
          </p>
        </div>
        
        {/* Blog Cards - Modern Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <Link
              href={`/blogs/${blog._id}`}
              key={blog._id}
              className="group flex flex-col bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6">
                {/* Meta info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  
                  {blog.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime} min read</span>
                    </div>
                  )}
                </div>
                
                {/* Title and description */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {blog.description}
                </p>
                
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Read more link */}
                <div className="flex items-center mt-auto pt-4 text-sm font-medium text-primary">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* "View All" Button with enhanced styling */}
        <div className="mt-16 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-3 font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <span>View All Blog Posts</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}