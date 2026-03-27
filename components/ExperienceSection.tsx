'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Briefcase, Calendar, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    company: 'Brontoboost',
    position: 'Web Designer',
    period: 'Mar 2025 – December 2025',
    description: 'WordPress & Shopify website design and customization',
    highlights: ['UI/UX improvements', 'Performance optimization'],
  },
  {
    company: 'Epixel Web',
    position: 'Graphic & Web Designer',
    period: 'Jan 2022 – Mar 2025',
    description: 'Designed websites, landing pages, and e-commerce stores',
    highlights: ['Branding creation', 'Digital marketing creatives'],
  },
  {
    company: 'Capacious IT Services Pvt Ltd',
    position: 'Graphic & Web Designer',
    period: 'Nov 2019 – May 2021',
    description: 'Responsive website development using HTML, CSS, Bootstrap',
    highlights: ['Full-stack design', 'Cross-browser compatibility'],
  },
  {
    company: 'Sophicapp Technologies',
    position: 'Graphic & Web Designer',
    period: 'Mar 2018 – Sep 2019',
    description: 'Website UI layouts, banners, and promotional creatives',
    highlights: ['Logo design', 'Banner creation'],
  },
];

export function ExperienceSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Section Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.9, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom-=50',
            toggleActions: 'play none none none',
          },
        }
      );

      // Unique 3D Flip Entry for Cards
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 100, 
            rotationX: -15, 
            rotationY: idx % 2 === 0 ? -10 : 10,
            scale: 0.9,
            transformPerspective: 2000 
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'top center',
              scrub: 1,
            },
          }
        )

        // Mobile-friendly tap/long-press (simulated by hover here)
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            z: 50,
            rotationX: 5,
            rotationY: -5,
            duration: 0.5,
            boxShadow: '0 40px 80px rgba(99, 102, 241, 0.4)',
            borderColor: 'rgba(99, 102, 241, 0.6)',
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            z: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(99, 102, 241, 0.2)',
          })
        })
      });
    }, sectionRef);

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 px-6 overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="mb-24 text-center space-y-4">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-black"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              XP Journey
            </span>
          </h2>
          <p className="text-xl text-muted-foreground font-semibold uppercase tracking-widest italic opacity-60">Professional Milestones</p>
        </div>

        <div className="space-y-12 sm:space-y-20 relative">
          {/* Vertical Track for Mobile */}
          <div className="absolute left-1/2 -ml-px top-0 w-[2px] h-full bg-gradient-to-b from-primary via-accent to-transparent opacity-20 hidden lg:block" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el
              }}
              className={`group relative perspective w-full ${idx % 2 === 0 ? 'lg:pr-32' : 'lg:pl-32 lg:ml-auto'}`}
              style={{ maxWidth: '900px' }}
            >
              {/* The Card */}
              <div
                className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-2xl p-10 transition-all duration-700 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Floating Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                          <Briefcase className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
                        </div>
                        <h3 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-none tracking-tighter">
                          {exp.position}
                        </h3>
                      </div>
                      <p className="text-xl font-bold text-primary/80 ml-16 italic">{exp.company}</p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground whitespace-nowrap bg-white/5 px-6 py-3 rounded-2xl border border-white/10 shadow-inner">
                      <Calendar className="w-4 h-4 text-primary" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground/90 font-medium mb-10 leading-relaxed max-w-2xl bg-white/5 p-6 rounded-3xl border border-white/5">
                    {exp.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="flex flex-wrap gap-4">
                    {exp.highlights.map((highlight, hidx) => (
                      <div
                        key={hidx}
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-transparent text-primary text-sm font-bold rounded-2xl border border-primary/20 group-hover:border-primary/50 transition-all hover:scale-105"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Index Indicator */}
                <div className="absolute bottom-6 right-10 text-8xl font-black text-white/5 select-none -z-10 group-hover:text-primary/10 transition-colors">
                  0{idx + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
