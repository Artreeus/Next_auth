"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, Sparkles } from "lucide-react"

export default function ProjectDetail({ params }) {
  const { id } = params
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`https://portfolio-backend001.vercel.app/api/projects/${id}`)
        
        if (!res.ok) {
          throw new Error('Failed to fetch project details')
        }
        
        const data = await res.json()
        setProject(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching project:', err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  if (isLoading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    )
  }

  if (error || !project) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 py-10 text-center">
          <p className="text-red-500">
            {error || "Project not found. It may have been removed or the ID is incorrect."}
          </p>
          <Link 
            href="/projects"
            className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Back to Projects
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/20">
            {project.imageUrl ? (
              <div className="aspect-video relative">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video bg-slate-800"></div>
            )}
          </div>

          {/* Project Details */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
            
            {project.category && (
              <div className="inline-block px-3 py-1 bg-indigo-500/20 rounded-full text-sm text-indigo-300 mb-6">
                {project.category}
              </div>
            )}

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-lg text-slate-300">{project.description}</p>
            </div>

            {/* Technologies Used */}
            {project.technologies && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-indigo-500/20 text-sm text-indigo-300 rounded-lg font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live Link */}
            {project.liveLink && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">Live Demo</h3>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Live Demo
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
