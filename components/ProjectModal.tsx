'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Send, User, Phone, Mail, MessageSquare } from 'lucide-react'

interface ProjectModalProps {
  trigger: React.ReactNode
}

export function ProjectModal({ trigger }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct the mailto link
    const subject = encodeURIComponent('New Project Inquiry from ' + formData.name)
    const body = encodeURIComponent(
      `Hello Venkatesh,\n\nI would like to start a new project with you.\n\n--- Project Details ---\nName: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nDescription: ${formData.description}\n`
    )
    
    window.location.href = `mailto:venkyweb746@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[999999] animate-in fade-in duration-300" />
        <Dialog.Content 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] sm:w-[95%] max-w-lg z-[1000000] focus:outline-none"
        >
          <div className="relative overflow-y-auto max-h-[85vh] rounded-[2rem] border border-white/10 bg-black p-5 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] animate-in zoom-in-95 fade-in duration-500">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="relative mb-6 sm:mb-10 text-center">
              <Dialog.Title className="text-2xl sm:text-4xl font-black italic tracking-tighter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent pb-1">
                Project Detail Form
              </Dialog.Title>
              <Dialog.Description className="text-muted-foreground mt-2 font-bold uppercase tracking-widest text-[9px] sm:text-xs opacity-60">
                Let&apos;s build something great together
              </Dialog.Description>
              
              <Dialog.Close className="absolute -top-1 -right-1 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all">
                <X className="w-4 h-4 sm:w-6 sm:h-6" />
              </Dialog.Close>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-primary/60 ml-2">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-all font-medium text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-secondary/60 ml-2">Mobile</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input
                    required
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-secondary/50 transition-all font-medium text-sm sm:text-base"
                    placeholder="Your mobile number"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-accent/60 ml-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent/50 transition-all font-medium text-sm sm:text-base"
                    placeholder="Your email address"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-primary/60 ml-2">Description</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-muted-foreground/40" />
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-all font-medium resize-none text-sm sm:text-base"
                    placeholder="Describe your project..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full group relative py-4 sm:py-6 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground font-black text-sm sm:text-lg overflow-hidden transition-all duration-300 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3 justify-center">
                  <span>Send Inquiry</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
