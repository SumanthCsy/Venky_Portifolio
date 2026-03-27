'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ExternalLink, Globe, Layout, Monitor, ShoppingBag } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { name: 'imisayurveda.com', category: 'E-commerce', icon: ShoppingBag },
  { name: 'shop.imisayurveda.com', category: 'Shopify', icon: ShoppingBag },
  { name: 'arkatulum.com', category: 'Website', icon: Layout },
  { name: 'theauravenue.com', category: 'Website', icon: Monitor },
  { name: 'overtimenightclub.com', category: 'Website', icon: Layout },
  { name: 'srivy.com', category: 'Website', icon: Monitor },
  { name: 'vgears.in', category: 'E-commerce', icon: ShoppingBag },
  { name: 'deemees.com', category: 'Website', icon: Layout },
];

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stunning Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, rotationX: -45 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom-=50',
          },
        }
      );

      // Projects grid animation with 3D Flip
      projectsRef.current.forEach((project, idx) => {
        if (!project) return;
        
        gsap.fromTo(
          project,
          { 
            opacity: 0, 
            rotationY: 90, 
            scale: 0.8,
            transformPerspective: 1000 
          },
          {
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 1,
            delay: idx * 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: project,
              start: 'top bottom-=50',
            },
          }
        )
      });
    }, sectionRef);

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-40" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-black tracking-tighter px-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic pb-2">
              Selected Works
            </span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground font-bold tracking-[0.3em] uppercase opacity-40">The Portfolio Gallery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={`https://${project.name}`}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                if (el) projectsRef.current[idx] = el as any
              }}
              className="group relative h-96 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-card/80 to-card/20 backdrop-blur-3xl p-10 hover:border-primary/50 transition-all duration-700 shadow-2xl hover:shadow-primary/20 block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full flex flex-col justify-between z-10">
                {/* Top Section */}
                <div className="space-y-6">
                   <div className="p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                      <project.icon className="w-8 h-8" />
                   </div>
                   
                   <div className="space-y-2">
                      <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                        {project.name}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-muted-foreground">
                        {project.category}
                      </div>
                   </div>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                           <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary/40" />
                        </div>
                      ))}
                   </div>
                   <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-45">
                      <ExternalLink className="w-6 h-6" />
                   </div>
                </div>
              </div>

              {/* Decorative Index */}
              <div className="absolute -right-4 -bottom-4 text-9xl font-black text-white/5 select-none -z-10 italic">
                {idx + 1}
              </div>
            </a>
          ))}
        </div>

        {/* Big Counter Footer */}
        <div className="mt-32 pt-20 border-t border-white/5 text-center flex flex-col items-center">
            <div className="text-8xl md:text-9xl font-black bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent opacity-20 mb-8">
              {projects.length}
            </div>
            <h4 className="text-4xl font-black mb-4">Successful Deliveries</h4>
            <p className="text-muted-foreground text-lg font-medium max-w-sm">Every project is a commitment to excellence and high-performance design.</p>
        </div>
      </div>
    </section>
  )
}
