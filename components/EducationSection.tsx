'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { GraduationCap, BookOpen, PencilIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    degree: "Bachelor's Degree",
    school: 'Apoorva Degree College',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-500',
    year: 'Graduated',
  },
  {
    degree: 'Intermediate',
    school: 'Sharada Junior College',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-500',
    year: 'Completed',
  },
  {
    degree: 'SSC',
    school: 'ZPHS High School, Eradapally',
    icon: PencilIcon,
    color: 'from-orange-500 to-red-500',
    year: 'Completed',
  },
]

export function EducationSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, rotationX: -15 },
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

      // Education cards animation with 3D flip
      itemsRef.current.forEach((item, idx) => {
        if (!item) return

        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            y: 80, 
            rotationX: 45, 
            scale: 0.8,
            transformPerspective: 1000 
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=50',
            },
          }
        )
      })
    }, sectionRef);

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -ml-64 -mb-64" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="mb-24 text-center">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-black italic tracking-tighter px-4">
            <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              Academic Deck
            </span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground font-bold tracking-[0.3em] uppercase opacity-40">Educational Legacy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((edu, idx) => {
            const Icon = edu.icon
            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) itemsRef.current[idx] = el
                }}
                className="group perspective"
              >
                <div
                  className="relative h-full bg-gradient-to-br from-card/80 to-card/20 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 hover:border-primary/50 transition-all duration-500 shadow-2xl group-hover:shadow-primary/20"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Floating effect */}
                  <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${edu.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative z-10 space-y-8">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div className={`p-5 rounded-3xl bg-gradient-to-br ${edu.color} shadow-lg shadow-black/20 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-muted-foreground">
                        {edu.year}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-lg font-bold text-primary/80 italic border-l-2 border-primary/30 pl-4">
                        {edu.school}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${edu.color} transition-all duration-700 rounded-full`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
