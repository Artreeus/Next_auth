"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code2, ExternalLink, Github } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"


// Define proper types for our project data
interface Technology {
  name: string;
  id: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
}

export default function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://portfolio-backend001.vercel.app/api/projects')
        
        if (!res.ok) {
          throw new Error('Failed to fetch projects')
        }
        
        const data = await res.json()
        // Take only the first 3 projects for the featured section
        setFeaturedProjects(data.slice(0, 3))
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setIsLoading(false)
      }
    }

    fetchProjects()
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
        <p className="text-red-500">Error loading projects: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Header with animated underline */}
        <div className="text-center mb-16">
          <SectionHeading title="Featured Projects" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work showcasing creativity, technical skills, and problem-solving abilities
          </p>
        </div>
        
        {/* Project Cards - Modern Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div key={project._id} className="group flex flex-col bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-700 flex items-center justify-center">
                    <Code2 className="w-12 h-12 text-slate-500" />
                  </div>
                )}
                
                
              </div>
              
              {/* Content */}
              <div className="flex-1 p-5">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {project.description}
                </p>
                
                {/* Action Links */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <Link
                    href={`/projects/${project._id}`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* "View All" Button with enhanced styling */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}