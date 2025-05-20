"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Code2, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeading from "@/components/shared/SectionHeading"

// Define the Project type for better type safety
type Project = {
  _id: string
  title: string
  description: string
  category: string
  imageUrl?: string
  techStack?: string
  featured?: boolean
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
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
        setProjects(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects based on active category
  const filteredProjects = projects

  if (isLoading) {
    return (
      <section className="py-20 relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-indigo-300 text-lg font-medium">Loading amazing projects...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-indigo-950/40"></div>
        <div className="relative z-10 max-w-md mx-auto text-center px-6 py-10 bg-slate-900/90 backdrop-blur-lg rounded-xl border border-red-500/20 shadow-xl">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Something went wrong</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <button 
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-lg hover:from-indigo-500 hover:to-indigo-400 transition-all"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 relative min-h-screen">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0 "></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      
      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      {/* Particle effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-indigo-500/50 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-4 bg-slate-800/50 px-4 py-2 rounded-full transition-all hover:bg-slate-700/70 border border-slate-700/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <SectionHeading title="All Projects"  />
          
          <motion.p 
            className="text-slate-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore my portfolio of projects spanning across various domains and technologies. 
            Each project represents a unique challenge and creative solution.
          </motion.p>
        </div>
        
        <motion.div
          className="flex justify-center items-center gap-2 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 bg-indigo-500/10 px-5 py-3 rounded-full border border-indigo-500/20">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-white font-medium">All Projects ({projects.length})</span>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  href={`/projects/${project._id}`}
                  className="group relative bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-md rounded-2xl border border-indigo-500/20 overflow-hidden shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2"
                >
                  {/* Project Image */}
                  <div className="aspect-video relative">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <Code2 className="w-12 h-12 text-indigo-300/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 group-hover:via-black/50 transition-colors" />
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-indigo-500/30 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1.5 border border-indigo-500/40 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                      <span>Featured</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                    
                    {project.techStack && (
                      <div className="mt-auto mb-4">
                        <p className="text-xs uppercase text-indigo-400 font-semibold mb-2">Tech Stack</p>
                        <p className="text-sm text-slate-300 font-mono bg-slate-800/50 py-2 px-3 rounded-lg border border-slate-700/50">
                          {project.techStack}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-indigo-300 mt-2 group-hover:text-white transition-colors">
                      <Code2 className="w-4 h-4" />
                      <span className="text-sm font-medium">View Project Details</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}