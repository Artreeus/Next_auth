"use client"

import { useState } from "react"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Send 
} from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ""
  })

  const handleChange = (e : any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Replace with your actual form submission API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
      
      setSubmitStatus({
        success: true,
        message: "Message sent successfully! I'll get back to you soon."
      })
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again later."
      })
    } finally {
      setIsSubmitting(false)
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({
          success: false,
          message: ""
        })
      }, 5000)
    }
  }

  return (
    <section className="py-16 px-8 container mx-auto rounded-xl bg-glassmorphism" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading title="Get In Touch" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold tracking-tight mb-6">Contact Information</h3>
            
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Email</h4>
                  <a href="mailto:hello@yourname.com" className="text-muted-foreground hover:text-primary transition-colors">
                    hello@yourname.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Phone</h4>
                  <a href="tel:+11234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Location</h4>
                  <p className="text-muted-foreground">
                    San Francisco, California
                  </p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-8 border-t border-border">
              <h4 className="text-base font-medium mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card hover:bg-primary/10 transition-colors border border-border"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card hover:bg-primary/10 transition-colors border border-border"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card hover:bg-primary/10 transition-colors border border-border"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Availability Info */}
            <div className="pt-8 border-t border-border">
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                <h4 className="text-base font-medium mb-2">Currently Available</h4>
                <p className="text-muted-foreground">
                  I'm currently available for freelance work and new opportunities.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-glassmorphism p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-2xl font-semibold tracking-tight mb-6">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-glassmorphism focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-glassmorphism focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-glassmorphism focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-glassmorphism focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>
              
              {/* Status Message */}
              {submitStatus.message && (
                <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}